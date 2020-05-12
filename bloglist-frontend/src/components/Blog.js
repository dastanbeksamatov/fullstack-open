import React, { useState } from 'react'
import { useField } from '../hooks'
import { useHistory } from 'react-router-dom'
const Blog = ({ blog, addLike, removeBlog, createComment }) => {
  const [ displayBlog, setDisplayBlog ] = useState(blog)
  const text = useField('', '')
  const history = useHistory()

  const handleLike = async () => {
    const likes = displayBlog.likes + 1
    console.log(likes)
    const newBlog = {
      ...displayBlog,
      likes
    }
    setDisplayBlog(newBlog)
    await addLike(newBlog)
  }

  const handleDelete = async () => {
    if(window.confirm(`Do you want to delete ${ displayBlog.title }?`)){
      await removeBlog(displayBlog)
      history.push('/blogs')
    }
  }

  const addComment = async () => {
    await createComment({text: text.value, id: displayBlog.id})
    history.push(`/blogs/${displayBlog.id}`)
  }

  if(!displayBlog){
    return null
  }
  return(
    <div id='blog.id' className='blog'>
      <h2>{ displayBlog.title } by { displayBlog.author } </h2>
      <h3><a href={ displayBlog.url }> {displayBlog.url} </a></h3>
      <h3>likes { displayBlog.likes }</h3>
      <button id='like-blog' onClick={ handleLike }> like </button>
      <button id='delete-blog' onClick={ handleDelete }> delete </button> <br/>
      <h3>comments</h3>
      <form onSubmit={ addComment }>
        <input { ...text } />
        <button type='submit'>comment</button>
      </form>
      <ul>
        { displayBlog.comments.map((comment, i) => {
          return (
            <li key={ i }>{ comment.text } </li>
          )
        }) }
      </ul>
    </div>
  )
}

export default Blog
