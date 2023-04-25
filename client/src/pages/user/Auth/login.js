import { useState } from 'react'
import { useAppContext } from '../../../context/appContext'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import './style.css'
const initialState = {
  email: '',
  password: '',
}
const Login = ({ toggleForgetPassword }) => {
  const clientId =
    '416171814520-lfb2dphm1hs81fviv9hjqp25mlrrui1t.apps.googleusercontent.com'
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
  } = useAppContext()
  const onLoginSuccess = (res) => {
    // const currentUser = { firstName, lastName, password, email }
    // setupUser({
    //   currentUser,
    //   endPoint: 'register',
    //   alertText: 'User Created! Redirecting...',
    // })
    console.log(res.profileObj)
  }

  const onLoginFailure = (res) => {
    console.log('Login Failed:', res)
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = values
    if (!password || !email) {
      displayAlert()
      return
    }
    const currentUser = { email, password }
    setupUser({
      currentUser,
      endPoint: 'login',
      alertText: 'Logged in successfully! Redirecting...',
    })
  }
  return (
    <form className='container' onSubmit={handleSubmit}>
      <h1>Login Form</h1>
      {showAlert && (
        <div className={`alert alert-${alertType}`}>{alertText}</div>
      )}
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
      <button type='submit' className='main_btn' disabled={isLoading}>
        Login
      </button>
      <div className='sign-google'>
        <GoogleLogin
          clientId={clientId}
          buttonText='Sign In'
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      </div>
      <p className='forgot_password' onClick={() => toggleForgetPassword()}>
        Forgot password?
      </p>
      <p>
        Not a member yet?
        <span className='change' onClick={() => toggleIsMember()}>
          Register
        </span>
      </p>
    </form>
  )
}

export default Login
