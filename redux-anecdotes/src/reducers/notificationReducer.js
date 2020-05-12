const initialState = ''
let message = ''
let timeoutID
const notificationReducer = (state = initialState, action) => {
  switch (action.type){
    case 'SET':
      message = `You voted for ${ action.message }`
      return message
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

export const clearNotification = () => {
  return{
    type: 'CLEAR'
  }
}

export const setNotification = (data, time) => {
  return async dispatch => {
    clearTimeout(timeoutID)
    dispatch({
      type: 'SET', 
      message: data
    })
    timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, time)
  }
}

export default notificationReducer