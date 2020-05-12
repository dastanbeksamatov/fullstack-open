import React from 'react'
import { useField } from '../hooks'

const BlogForm = ({ addBlog, blogFormRef }) => {

  const title = useField('', '')
  const author = useField('', '')
  const url = useField('', '')
  const likes = useField('number', 0)

  const reset = () => {
    title.value = ''
    author.value = ''
    url.value = ''
    likes.value = 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    await addBlog({
      title: title.value,
      author: author.value,
      url: url.value,
      likes: likes.value
    })
    reset()
  }
  return (
    <div>
      <form id='login-form' onSubmit={ handleSubmit } >
        <div>
          title
          <input
            id = 'title' name='title' {...title} >
          </input>
        </div>
        <div>
          author:
          <input
            id = 'author' name='author' {...author} >
          </input>
        </div>
        <div>
          url
          <input
            id = 'url' name='url' {...url} >
          </input>
        </div>
        <div>
          likes
          <input
            id = 'likes' name='likes' {...likes}>
          </input>
          <br/>
          <button id='submit-blog' type='submit'>Add</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm