import React, { useReducer } from 'react'
import Messenger from '../Messenger'
import Login from '../Login'
import reducer from '../../reducer'

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    isAuth: false,
  })
  const onLogin = (payload) => {
    dispatch({
      type: 'IS_AUTH',
      payload,
    })
  }
  return (
    <div className="App">
      {state.isAuth ? <Messenger /> : <Login onLogin={onLogin} />}
    </div>
  )
}
