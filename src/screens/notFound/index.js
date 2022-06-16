import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="not-found">
      <h2>Welcome</h2>
      <div className='login-button' onClick={() => { navigate('/login') }}>GO TO LOGIN</div>
    </div>
  )
}

export default NotFound