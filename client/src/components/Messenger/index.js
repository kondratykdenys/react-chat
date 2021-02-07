import React, { useEffect, useState } from 'react'
import ConversationList from '../ConversationList'
import MessageList from '../MessageList'
import './Messenger.css'
import socket from '../../socket'

export default function Messenger() {
  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState([])

  useEffect(() => {
    getRoom()
  }, [])

  const getRoom = () => {
    const getRoom = ({ users, messages }) => {
      const newUsers = users.map((user) => {
        return {
          photo: user.picture.large,
          name: `${user.name.firstName} ${user.name.lastName}`,
        }
      })
      setConversations(newUsers)
      setMessages(messages)
    }
    socket.on('JOINED', getRoom)
    socket.on('LEAVE', getRoom)
    socket.on('GET_MESSAGE', ({ messages }) => {
      setMessages(messages)
    })
  }
  return (
    <div className="messenger">
      <div className="scrollable sidebar">
        <ConversationList conversations={conversations} />
      </div>

      <div className="scrollable content">
        <MessageList messages={messages} myUserId={socket.id} />
      </div>
    </div>
  )
}
