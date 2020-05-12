import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const changeVote = async (id) => {
  const anecdotes = await axios.get(baseUrl)
  console.log(anecdotes.data)
  const anecdote = anecdotes.data.find(anecdote => id===anecdote.id)
  console.log(anecdote)
  const anec = {
    content: anecdote.content,
    votes: anecdote.votes + 1
  }
  console.log(anec)
  const response = await axios.put(`${baseUrl}/${id}`, anec)
  return response.data
}

export default { getAll, createNew, changeVote }