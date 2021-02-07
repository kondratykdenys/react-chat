import React from 'react'
import './Compose.css'
import useInput from '../../hooks/useInput'
import socket from '../../socket'

export default function Compose({ rightItems }) {
  const [message, { reset: resetMessage }] = useInput()

  const onSubmit = (event) => {
    event.preventDefault()
    if (!message.value) {
      return
    }

    socket.emit('ADD_NEW_MESSAGE', { message: message.value })
    resetMessage()
  }
  return (
    <form onSubmit={onSubmit} className="compose">
      <input
        type="text"
        className="compose-input"
        placeholder="Type a message, @name"
        {...message}
      />
      {rightItems}
    </form>
  )
}
