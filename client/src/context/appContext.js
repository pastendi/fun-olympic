import React, { useReducer, useContext } from 'react'
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  TOGGLE_DISPLAY_MODEL,
  TOGGLE_IS_MEMBER,
  UNMATCHED_PASSWORD,
  RESET_LINK_SUCCESS,
  LOGOUT_USER,
  GET_VIDEOS_BEGIN,
  GET_VIDEOS_SUCCESS,
  TOGGLE_USER_DROPDOWN,
  CHANGE_WINDOW,
} from './actions'

import reducer from './reducer'
import axios from 'axios'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const email = localStorage.getItem('email')

const initialState = {
  isLoading: false,
  showAlert: false,
  isMember: true,
  model: false,
  alertText: '',
  alertType: '',
  user: user || null,
  token: token || null,
  email: email || null,
  videos: [],
  userDropdown: false,
  window: 'Dashboard',
}
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const authFetch = axios.create({
    baseURL: '/api',
  })

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }
  const toggleModel = () => {
    dispatch({
      type: TOGGLE_DISPLAY_MODEL,
    })
  }
  const toggleIsMember = () => {
    dispatch({
      type: TOGGLE_IS_MEMBER,
    })
  }
  const setWindow = (activeWindow) => {
    dispatch({
      type: CHANGE_WINDOW,
      payload: { activeWindow },
    })
  }

  const addUserToLocalStorage = ({ user, email, token }) => {
    localStorage.setItem('user', user)
    localStorage.setItem('token', token)
    localStorage.setItem('email', email)
  }
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('email')
  }
  const passwordNotMatching = () => {
    dispatch({
      type: UNMATCHED_PASSWORD,
    })
  }
  const logoutUser = async () => {
    await axios.patch('/api/user/change-status', {
      email: state.email,
      status: false,
    })
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }
  const adminLogin = async ({ username, password }) => {
    try {
      const response = await axios.post('/api/auth/admin', {
        username,
        password,
      })
      const { user, token } = response.data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token },
      })
      addUserToLocalStorage({ user, token })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
  }
  const setupUser = async ({ endPoint, currentUser, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const response = await axios.post(`/api/auth/${endPoint}`, currentUser)
      const { user, token } = response.data
      if (response.status == 200 || response.status == 201) {
        await axios.patch('/api/user/change-status', {
          email: currentUser.email,
          status: true,
        })
      }
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, email: currentUser.email, token, alertText },
      })
      addUserToLocalStorage({ user, email: currentUser.email, token })
      dispatch({
        type: TOGGLE_DISPLAY_MODEL,
      })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }
  const forgotPassword = async ({ email }) => {
    try {
      const response = await axios.post(`/api/mail/passwordReset`, {
        user: email,
      })
      const { message } = response.data
      dispatch({
        type: RESET_LINK_SUCCESS,
        payload: { message },
      })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }
  const getVideos = async () => {
    let url = '/videos/'
    dispatch({ type: GET_VIDEOS_BEGIN })
    try {
      const { data } = await authFetch(url)
      const { videos, totalVideos, numOfPages } = data
      dispatch({
        type: GET_VIDEOS_SUCCESS,
        payload: {
          videos,
          totalVideos,
          numOfPages,
        },
      })
    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }
  const toggleUserDropdown = ({ toggle }) => {
    dispatch({
      type: TOGGLE_USER_DROPDOWN,
      payload: { toggle },
    })
  }
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        logoutUser,
        toggleModel,
        toggleIsMember,
        passwordNotMatching,
        adminLogin,
        forgotPassword,
        getVideos,
        toggleUserDropdown,
        setWindow,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
const useAppContext = () => {
  return useContext(AppContext)
}
export { AppProvider, initialState, useAppContext }
