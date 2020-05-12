import React from 'react'
import { Form, Button } from 'react-bootstrap'


const LoginForm = ({ login, invalidLogin }) => {

  const handleLogin = async (event) => {
    event.preventDefault()
    const form = event.target
    try {
      login({ username: form.elements.username.value, password: form.elements.password.value })
    }
    catch(exception){
      invalidLogin()
    }
  }

  return (
    <div>
      <Form  id='login-form' onSubmit={ handleLogin }>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            name="username"
          />
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            name="password"
          />
          <Button variant="primary" type="submit">
            login
          </Button> 
        </Form.Group>
      </Form>
    </div>
  )
}
export default LoginForm