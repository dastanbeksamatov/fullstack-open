import React from 'react'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { changeVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const vote = (id, content) => {
    dispatch(dispatch => {
      props.changeVote(id)
      props.setNotification(content, 5000)
    })
  }
  return (
    <ul>
      {props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
      <li key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
        </div>
      </li>
    )}
    </ul>
  )
}

const mapDispatchProps = {
  changeVote,
  setNotification,
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  }
}

const ConnectedAnnecdotes = connect(mapStateToProps, mapDispatchProps)(AnecdoteList)
export default ConnectedAnnecdotes