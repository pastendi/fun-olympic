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
  GET_VIDEOS_BEGIN,
  GET_VIDEOS_SUCCESS,
  LOGOUT_USER,
  TOGGLE_USER_DROPDOWN,
  CHANGE_WINDOW,
} from './actions'
import { initialState } from './appContext'
const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values',
    }
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    }
  }
  if (action.type === TOGGLE_DISPLAY_MODEL) {
    return {
      ...state,
      model: !state.model,
      isMember: true,
    }
  }
  if (action.type === TOGGLE_IS_MEMBER) {
    return {
      ...state,
      isMember: !state.isMember,
    }
  }
  if (action.type === TOGGLE_USER_DROPDOWN) {
    return {
      ...state,
      userDropdown: action.payload.toggle,
    }
  }

  if (action.type === SETUP_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      email: action.payload.email,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    }
  }
  if (action.type === RESET_LINK_SUCCESS) {
    return {
      ...state,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.message,
    }
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  if (action.type === UNMATCHED_PASSWORD) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Your password did not matched !!!',
    }
  }
  if (action.type === GET_VIDEOS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false }
  }
  if (action.type === GET_VIDEOS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      videos: action.payload.videos,
      totalVideos: action.payload.totalVideos,
      numOfPages: action.payload.numOfPages,
    }
  }
  if (action.type === CHANGE_WINDOW) {
    return {
      ...state,
      window: action.payload.activeWindow,
    }
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
    }
  }
}
export default reducer
