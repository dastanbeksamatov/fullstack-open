import anecdoteService from '../services/anecdotes'
const anecdoteReducer = (state = [], action) => {
  switch(action.type){
    case 'VOTE':
      const changedAnecdote = action.data
      return state.map(anec =>
        anec.id !== changedAnecdote.id ? anec: changedAnecdote)
    case 'NEW_ANEC':
      return [ ...state, action.data ]
    case 'INIT_NOTES':
      return action.data
    default:
      return state
  }
}

export const changeVote = (id) => {
  return async dispatch => {
    const changedAnecdote = await anecdoteService.changeVote(id)
    dispatch({
      type: 'VOTE',
      data: changedAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const newAnecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: newAnecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANEC',
      data: newAnecdote
    })
  }
}
export default anecdoteReducer