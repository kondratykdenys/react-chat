import React from 'react'
import './Compose.css'
import useInput from '../../hooks/useInput'
import socket from '../../socket'

export default function Compose({ rightItems, messageList }) {
  const [message, { reset: resetMessage }] = useInput()

  const onSubmit = (event) => {
    event.preventDefault()
    if (!message.value) {
      return
    }

    socket.emit('ADD_NEW_MESSAGE', { message: message.value })
    resetMessage()
    messageList.current.scrollIntoView({
      block: 'end',
    })

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
