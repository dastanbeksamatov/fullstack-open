import React, { useState } from 'react'
import { Switch, Link, Route, useRouteMatch, useHistory} from 'react-router-dom'
import { useField } from './hooks/useField'
const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/anecdotes/:id">anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => {
  console.log(anecdotes)
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => 
          <li key={anecdote.id} >
            <Link to={`/anecdotes/${anecdote.id}`} >{anecdote.content}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

const Anecdote = ({ anecdote }) => {
  console.log(anecdote)
  return(
  <div>
    <h2> { anecdote.content } </h2>
    <p> has { anecdote.votes } votes</p>  
  </div>
  )
}

const Notification = ({ notification }) => {
  const style = {
    borderStyle: 'solid',
      borderColor: 'rgba(36, 241, 6, 0.46)',
      backgroundColor: 'rgba(7, 149, 66, 0.12156862745098039)',
      color: 'rgba(36, 241, 6, 0.46)',
      textShadow: 2,
      transition:0.5
  }
  return(
    <div style = { style }>
      { notification }
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const votes = useField('number')
  const history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: votes.value
    })
    history.push('/')
  }
  const onReset = (event) => {
    event.preventDefault()
    content.reset()
    author.reset()
    info.reset()
    votes.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            type={content.type}
            value={content.value}
            onChange={content.onChange}
          />
        </div>
        <div>
          author
          <input 
            type={author.type}
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div> 
          url for more info
          <input
            type={info.type}
            value={info.value}
            onChange={info.onChange}
          />
        </div>
        <div>
          votes
          <input
            type={votes.type}
            value={votes.value}
            onChange={votes.onChange}
          />
        </div>
        <button type="submit">create</button>
        <button onClick={ onReset }>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`added ${ anecdote.content }`)
    setTimeout(() => {
      setNotification('')
    }, 10000)
  }

  let match = useRouteMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find(anecdote => Number(anecdote.id) === Number(match.params.id)): null

  return (
      <div>
      <Menu />
      <Notification notification={ notification }/>
        <Switch>
          <Route path="/anecdotes/:id">
            <Anecdote anecdote={anecdote} />
          </Route>
          <Route path="/anecdotes">
            <AnecdoteList anecdotes={ anecdotes }/>
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/create">
            <CreateNew addNew={addNew}/>
          </Route>
          <Route path="/">
            <h1>Software anecdotes</h1>
            <AnecdoteList anecdotes={ anecdotes } />
          </Route>
        </Switch>
        <Footer />
      </div>
  )
}

export default App;
