import React from 'react'
import { connect } from 'react-redux'
import { setPattern } from '../reducers/filterReducer'

const Filter = (props) => {
  const setFiltered = (event) => {
    event.preventDefault()
    props.setPattern(event.target.value)
  }

  return (
    <div>
      <input onChange={ setFiltered } />
    </div>
  )
}


export default connect(
  null,
  { setPattern }
)(Filter)