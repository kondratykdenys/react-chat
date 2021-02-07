import React from 'react'
import useInput from '../../hooks/useInput'
import './Login.css'
import socket from '../../socket'

function Login({ onLogin }) {
  const [firstName] = useInput()
  const [lastName] = useInput()

  const onSubmit = (event) => {
    event.preventDefault()
    onLogin(true)
    socket.emit('JOIN', {
      firstName: firstName.value,
      lastName: lastName.value,
    })
  }

  return (
    <div className="login-wrapper">
      <form onSubmit={onSubmit}>
        <input type="text" {...firstName} placeholder="First name" required />
        <input type="text" {...lastName} placeholder="Last name" required />
        <button>Login</button>
      </form>
    </div>
  )
}

export default Login
