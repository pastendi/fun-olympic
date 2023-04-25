import { useState } from 'react'
import { useAppContext } from '../../../context/appContext'
import { useNavigate } from 'react-router-dom'
import './style.css'
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  cPassword: '',
}
const Register = ({ isMember, setIsMember }) => {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)
  const {
    isLoading,
    alertType,
    alertText,
    showAlert,
    displayAlert,
    setupUser,
    toggleIsMember,
    passwordNotMatching,
  } = useAppContext()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { firstName, lastName, password, cPassword, email } = values
    if (!firstName || !lastName || !password || !cPassword || !email) {
      displayAlert()
      return
    }
    if (password !== cPassword) {
      passwordNotMatching()
      return
    }
    const currentUser = { firstName, lastName, password, email }
    setupUser({
      currentUser,
      endPoint: 'register',
      alertText: 'User Created! Redirecting...',
    })
  }

  return (
    <form className='container' onSubmit={handleSubmit}>
      <h1>Create Account</h1>
      {showAlert && (
        <div className={`alert alert-${alertType}`}>{alertText}</div>
      )}
      <input
        type='text'
        placeholder='First Name'
        name='firstName'
        onChange={handleChange}
        value={values.firstName}
        required
        className='user_input'
      />
      <input
        type='text'
        placeholder='Last Name'
        name='lastName'
        onChange={handleChange}
        value={values.lastName}
        required
        className='user_input'
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        onChange={handleChange}
        value={values.email}
        required
        className='user_input'
      />
      <input
        type='password'
        placeholder='Password'
        name='password'
        onChange={handleChange}
        value={values.password}
        required
        className='user_input'
      />
      <input
        type='password'
        placeholder='Confirm Password'
        name='cPassword'
        onChange={handleChange}
        value={values.cPassword}
        required
        className='user_input'
      />
      <button type='submit' className='main_btn' disabled={isLoading}>
        Register
      </button>
      <p>
        Already member?{' '}
        <span className='change' onClick={() => toggleIsMember()}>
          Login
        </span>
      </p>
    </form>
  )
}

export default Register
