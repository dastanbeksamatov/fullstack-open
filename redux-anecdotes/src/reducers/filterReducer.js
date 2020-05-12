const initialState = ''

const filterReducer = (state = initialState, action) => {
  switch(action.type){
    case 'SET_PATTERN':
      return action.pattern
    default:
      return initialState
  }
}

export const setPattern = (pattern) => {
  return {
    type: 'SET_PATTERN',
    pattern: pattern
  }
}

export default filterReducer