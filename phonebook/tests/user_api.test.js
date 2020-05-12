const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')
const User = require('../models/user')
const helper = require('./test_helper')
describe('When there is one user initially ', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creating new user gives fresh username', async () => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
      username: 'dastan',
      name: 'Dastan Samatov',
      password: 'Me55i10'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(userAtStart.length + 1)
    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })
  test('creating user that is already in db throws error', async () => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Jack Smith',
      password: 'JackSmith'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    const usersAtEnd = await helper.usersInDb()
    expect(userAtStart).toHaveLength(usersAtEnd.length)
  })
})
afterAll(() => {
  mongoose.connection.close()
})