let timerId
const initialNotification = {
  body: '',
  type: true
}
const notificationReducer = (state = initialNotification, action) => {
  switch(action.type){
    case 'ERROR_MESSAGE':
      return action.data
    case 'TRUE_MESSAGE':
      return action.data
    case 'CLEAR_MESSAGE':
      return initialNotification
    default:
      return state
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_MESSAGE'
  }
}

export const setErrorMessage = (message, time) => {
  return async dispatch => {
    clearTimeout(timerId)
    dispatch({
      type: 'ERROR_MESSAGE',
      data: message
    })
    timerId = setTimeout(() => {
      dispatch(clearNotification())
    }, time)
  }
} 

export const setNotification = (message, time) => {
  return async dispatch => {
    clearTimeout(timerId)
    dispatch({
      type: 'TRUE_MESSAGE',
      data: message
    })
    timerId = setTimeout(() => {
      dispatch(clearNotification())
    }, time)
  }
} 

export default notificationReducer