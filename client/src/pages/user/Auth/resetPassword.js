import { useState, useEffect } from 'react'
import { useAppContext } from '../../../context/appContext'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './style.css'

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('')
  const [cPassword, setCPassword] = useState('')
  const [tokenStatus, setTokenStatus] = useState(true)
  const [userId, setUserId] = useState('')
  const { token } = useParams()
  const navigate = useNavigate()
  const url = `/api/mail/passwordReset/${token}`

  const {
    clearAlert,
    alertType,
    alertText,
    showAlert,
    displayAlert,
    passwordNotMatching,
  } = useAppContext()

  const handleSubmit = async () => {
    console.log(userId)
    if (!newPassword && !cPassword) {
      displayAlert()
    }
    if (newPassword !== cPassword) {
      passwordNotMatching()
    }
    try {
      await axios.post(`/api/mail/passwordReset/${userId}`, {
        newPassword,
      })
      showAlert()
    } catch (error) {
      console.log(error)
      return
    }
    navigate('/')
  }
  const checkToken = async (url) => {
    const res = await axios.get(url)
    const { validToken, userId } = res.data
    setTokenStatus(validToken)
    setUserId(userId)
  }
  useEffect(() => {
    checkToken(url)
  }, [])
  return (
    <>
      {!tokenStatus ? (
        <div>
          <h1>
            This token is already used once, please request for another link
          </h1>
        </div>
      ) : (
        <div className='container'>
          <h1>Change password</h1>
          <h5>
            You are almost there ! Now you simply need to set new password
          </h5>
          {showAlert && (
            <div className={`alert alert-${alertType}`}>{alertText}</div>
          )}
          <input
            type='password'
            placeholder='New Password'
            name='newPassword'
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            required
            className='user_input'
          />
          <input
            type='password'
            placeholder='Confirm Password'
            name='cPassword'
            onChange={(e) => setCPassword(e.target.value)}
            value={cPassword}
            required
            className='user_input'
          />
          <button onClick={() => handleSubmit()} className='main_btn'>
            Change password
          </button>
        </div>
      )}
    </>
  )
}

export default ResetPassword
