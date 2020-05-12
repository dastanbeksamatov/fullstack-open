import React, { useEffect } from 'react'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
// import components
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
// important functions from reducers
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, addBlog, removeBlog, updateBlog, commentBlog } from './reducers/blogReducer'
import { setNotification, setErrorMessage } from './reducers/notificationReducer'
import { setUser, clearUser } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'
// functions for style
import { Table } from 'react-bootstrap'
import { Container, AppBar, Button, Toolbar } from '@material-ui/core'

const App = () => {
  const blogFormRef = React.createRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initUsers())
  }, [dispatch])

  useEffect(() => {
    if(window.localStorage.getItem('loggedInUser')){
      const user = window.localStorage.getItem('loggedInUser')
      const { token, ...curUser } = JSON.parse(user)
      dispatch(setUser(curUser))
      // this function is initialized because no await call inside useEffect
      const setToken = async (token) => {
        await blogService.setToken(token)
      }
      setToken(token)
    }
  }, [dispatch])

  const message = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  const handleClick = () => {
    window.localStorage.clear()
    dispatch(clearUser())
  }

  const addLike = async (newBlog) => {
    dispatch(updateBlog(newBlog))
  }

  const createBlog = async (newBlog) => {
    dispatch(addBlog(newBlog))
    dispatch(setNotification({ body:`${ newBlog.title } by ${ newBlog.author } is added`, type: true }, 5000))
  }

  const deleteBlog = async (blog) => {
    dispatch(removeBlog(blog.id))
    dispatch(setErrorMessage({ body: `${ blog.title } by ${ blog.author } was removed`, type: false }, 5000))
  }

  const login = async (u) => {
    const response = await loginService.login(u)
    const { token, ...loggedInUser } = response
    window.localStorage.setItem('loggedInUser', JSON.stringify(response))
    await blogService.setToken(token)
    dispatch(setUser(loggedInUser))
  }

  const createComment = async (comment) => {
    dispatch(commentBlog(comment))
  }

  const invalidLogin = async () => {
    dispatch(setErrorMessage({body: 'invalid credentials', type: false}, 5000))
  }

  const match = useRouteMatch('/users/:id')
  const selectedUser = match ? users.find(user => user.id === match.params.id) : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const matchedBlog = blogMatch ? blogs.find(blog => blog.id === blogMatch.params.id) : null

  const Menu = () => {
    return (
      <Container>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={ Link } to="/"> main</Button>
            <Button color="inherit" component={ Link } to="/blogs">blogs</Button>
            <Button color="inherit" component={ Link } to="/users">users</Button>
            <Button >
              {user
                ? <em>{ user.name } logged in</em>
                : <Button color="inherit" component={ Link } to="/">
                  </Button>
              }
            </Button>
            <Button color="inherit" onClick={ handleClick }>log out</Button>
          </Toolbar>
        </AppBar>
      </Container>
    )
  }

  const listBlogs = () => {
    return(
      <div>
        <h4>Create new</h4>
        <Togglable buttonLabel='new blog' ref={ blogFormRef }>
          <BlogForm addBlog={ createBlog } blogFormRef = { blogFormRef }/>
        </Togglable>
        <Table striped variant="dark">
          <tbody>
            { blogs.sort((a,b) => a.likes - b.likes).map(blog => 
              <tr key={ blog.id }>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{ blog.title }</Link>
                </td>
                <td>
                  {blog.author}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    )
  }
  const loginForm = () => {

    return (
      <div>
        <Togglable buttonLabel='login'>
          <LoginForm login ={ login } invalidLogin = { invalidLogin } />
        </Togglable>
      </div>
    )
  }
  if (user===null){
    return(
      <div id='login-form'>
        <Notification message= { message }/>
        { loginForm() }
      </div>
    )
  }
  return (
    <div id='list-blogs' className="container">
      <Menu />
      <Notification message={ message }/>
      <h1>Bloglist app</h1>
      <Switch>
        <Route path="/users/:id">
          <User user={ selectedUser } />
        </Route>
        <Route path="/users">
          <Users users={ users }/>  
        </Route>
        <Route path="/blogs/:id">
          <Blog blog = { matchedBlog } addLike={ addLike } removeBlog={ deleteBlog } createComment={ createComment }/>
        </Route>
        <Route path="/blogs">
          { listBlogs() }
        </Route>
        <Route path="/">
          <Container>
            <h3>Welcome to the main page of the Bloglist app </h3>
          </Container>
        </Route>
      </Switch>
    </div>
  )
}

export default App