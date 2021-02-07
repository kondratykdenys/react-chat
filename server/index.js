const express = require('express')
const path = require('path')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.json())
const room = {
  users: [],
  messages: [],
}

const PORT = process.env.PORT || 3001

if ((process.env.NODE_ENV = 'production')) {
  app.use(express.static('../client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'))
  })
}

async function start() {
  try {
    io.on('connection', (socket) => {
      socket.on('JOIN', ({ firstName, lastName }) => {
        const newUser = {
          id: socket.id,
          name: {
            firstName,
            lastName,
          },
          picture: {
            large: `https://randomuser.me/api/portraits/men/${(
              Math.random() * 100
            ).toFixed()}.jpg`,
          },
        }
        room.users.push(newUser)
        socket.emit('JOINED', room)
        socket.broadcast.emit('JOINED', room)
      })

      socket.on('ADD_NEW_MESSAGE', ({ message }) => {
        room.messages.push({
          id: Math.random(),
          author: room.users.find((user) => {
            if (user.id === socket.id) {
              return user
            }
          }),
          message,
          timestamp: new Date().getTime(),
        })
        socket.emit('GET_MESSAGE', room)
        socket.broadcast.emit('GET_MESSAGE', room)
      })

      socket.on('disconnect', () => {
        room.users = room.users.filter((user) => user.id !== socket.id)
        socket.broadcast.emit('LEAVE', room)
      })
    })
    server.listen(PORT, () => {
      console.log(`Listen on ${PORT}`)
    })
  } catch (e) {
    console.log(e.message)
    process.exit(1)
  }
}

start()
