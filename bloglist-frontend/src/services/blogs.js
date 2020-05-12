import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const add = async newBlog => {
  const response = await axios.post(
    baseUrl,
    newBlog,
    { headers: { Authorization: token }
    })
  return response.data
}

const addComment = async comment => {
  const {id, ...rest} = comment
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    rest,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
  console.log(response.data)
  return response.data
}

const update = async newBlog => {
  // eslint-disable-next-line no-unused-vars
  const { id, user, ...blog } = newBlog
  const response = await axios.put(
    `${baseUrl}/${id}`,
    blog,
    {
      headers: {
        Authorization: token
      }
    }
  )
  return response.data
}

const remove = async id => {
  const response = await axios.delete(
    `${baseUrl}/${id}`,
    {
      headers: {
        Authorization: token
      }
    }
  )
  return response.data
}

export default {
  getAll,
  add,
  setToken,
  remove,
  update,
  addComment
}