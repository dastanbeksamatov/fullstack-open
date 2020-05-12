import blogService from '../services/blogs'
const initialState = []

const blogReducer = (state = initialState, action) => {
  switch (action.type){
    case 'INIT_BLOGS':
      return action.data
    case 'ADD':
      const newBlog = action.data
      console.log(newBlog)
      return state.concat(newBlog)
    case 'REMOVE':
      const oldBlog = action.data
      return state.filter(blog => blog.id !== oldBlog.id)
    case 'UPDATE':
      const uBlog = action.data
      const newBlogs = state.filter(blog => blog.id !== uBlog.id)
      return newBlogs.concat(uBlog)
    case 'COMMENT':
      const nBlogs = state.filter(blog => blog.id !== action.data.id)
      return nBlogs.concat(action.data)
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.add(blog)
    dispatch({
      type: 'ADD',
      data: newBlog
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    const removedBlog = await blogService.remove(id)
    dispatch({
      type: 'REMOVE',
      data: removedBlog
    })
  }
}

export const updateBlog = (newBlog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(newBlog)
    console.log(updatedBlog)
    dispatch({
      type: 'UPDATE',
      data: updatedBlog
    })
  }  
}

export const commentBlog = (comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.addComment(comment)
    console.log(updateBlog)
    dispatch({
      type: 'COMMENT',
      data: updatedBlog
    })
  }
}

export default blogReducer