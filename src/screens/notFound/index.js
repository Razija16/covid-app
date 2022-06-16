import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="not-found">
      <h2>Welcome to the Covid App</h2>
      <div className='login-button' onClick={() => { navigate('/signup') }}>Sign Up</div>
      <div className='login-button' onClick={() => { navigate('/login') }}>Login</div>
    </div>
  )
}

export default NotFound