import { useEffect, useState } from 'react'
import { useAppContext } from '../../../context/appContext'
import { useNavigate } from 'react-router-dom'
import './style.css'

const Login = () => {
  const [data, setData] = useState({ username: '', password: '' })
  const navigate = useNavigate()
  const { user, alertType, alertText, showAlert, displayAlert, adminLogin } =
    useAppContext()

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { username, password } = data
    if (!password || !username) {
      displayAlert()
      return
    }
    adminLogin({ username, password })
  }
  useEffect(() => {
    if (user) {
      navigate('/admin')
    }
  }, [user, navigate])

  return (
    <div className='login_container'>
      <div className='login_form_container'>
        <div className='left'>
          <h1>Welcome to FunOlympic</h1>
        </div>
        <div className='right'>
          <form className='form_container' onSubmit={handleSubmit}>
            <h1>Admin control panel</h1>
            <h3>Login Form</h3>
            {showAlert && (
              <div className={`alert alert-${alertType}`}>{alertText}</div>
            )}
            <input
              type='text'
              placeholder='Username'
              name='username'
              onChange={handleChange}
              value={data.username}
              required
              className='input'
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              onChange={handleChange}
              value={data.password}
              required
              className='input'
            />
            <button type='submit' className='green_btn'>
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
