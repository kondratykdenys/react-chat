const express = require("express")
const path = require("path")

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3001

if ((process.env.NODE_ENV = "production")) {
  app.use(express.static("../client/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"))
  })
}

async function start() {
  try {
    app.listen(PORT, () => {
      console.log(`Listen on ${PORT}`)
    })
  } catch (e) {
    console.log(e.message)
    process.exit(1)
  }
}

start()