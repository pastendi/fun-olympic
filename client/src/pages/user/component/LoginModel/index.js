import React, { useState } from 'react'
import { useAppContext } from '../../../../context/appContext'
import ForgotPassword from '../../Auth/forgotPassword'
import Login from '../../Auth/login'
import Register from '../../Auth/register'
import './style.css'

const LoginModel = () => {
  const { toggleModel, isMember } = useAppContext()
  const [forgotPassword, setForgotPassword] = useState(false)
  const toggleForgetPassword = () => {
    setForgotPassword(!forgotPassword)
  }
  return (
    <div className='background'>
      <article className='model'>
        <div className='left_part'></div>
        <div className='right_part'>
          <span className='close_btn' onClick={() => toggleModel()}>
            <i class='fa-solid fa-xmark'></i>
          </span>
          {isMember ? (
            forgotPassword ? (
              <ForgotPassword toggleForgetPassword={toggleForgetPassword} />
            ) : (
              <Login toggleForgetPassword={toggleForgetPassword} />
            )
          ) : (
            <Register />
          )}
        </div>
      </article>
    </div>
  )
}

export default LoginModel
