import axios from 'axios'
const baseUrl = '/api/users'

const add = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default {
  add,
  getAll
}