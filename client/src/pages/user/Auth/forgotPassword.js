import { useState } from 'react'
import { useAppContext } from '../../../context/appContext'

const ForgotPassword = ({ toggleForgetPassword }) => {
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
    <form className='container' onSubmit={handleSubmit}>
      <h3>Have you forget password, no worries</h3>
      <p>Please enter the registered email to receive reset link</p>
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
      <button type='submit' className='main_btn'>
        Reset password
      </button>
      <button onClick={() => toggleForgetPassword()}>Go back</button>
    </form>
  )
}

export default ForgotPassword
