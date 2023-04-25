import React, { useState } from 'react'
import { useAppContext } from '../../../context/appContext'
import './index.css'
const ResetPasswordLink = () => {
  const [email, setEmail] = useState('')
  const {
    clearAlert,
    alertType,
    alertText,
    showAlert,
    displayAlert,
    forgotPassword,
  } = useAppContext()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      displayAlert()
      return
    }
    forgotPassword({ email })
    setEmail('')
  }
  return (
    <form onSubmit={handleSubmit} id='resetLink'>
      <h1>Sending rest link</h1>
      <p>Please enter the user email to sent reset link</p>
      {showAlert && (
        <div className={`alert alert-${alertType}`}>{alertText}</div>
      )}
      <input
        type='email'
        placeholder='Email'
        name='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
        className='user_input'
      />
      <button type='submit' className=''>
        Send reset link
      </button>
    </form>
  )
}

export default ResetPasswordLink
