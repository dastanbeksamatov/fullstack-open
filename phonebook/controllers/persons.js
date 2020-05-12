const peopleRouter = require('express').Router()
const Person = require('../models/person')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

peopleRouter.get('/api/persons', async (req, res) => {
  const persons = await Person.find({}).populate('user', { username: 1, name: 1 })
  res.json(persons.map(person => person.toJSON()))
})

peopleRouter.get('/api/persons/:id', async (req, res) => {
  const id = req.params.id
  const person = await Person.findById(id)
  if(person){
    res.json(person.toJSON())
  }
  else{
    res.status(404).end()
  }
})

peopleRouter.get('/info',  async (req, res) => {
  const date = new Date().toDateString()
  const time = new Date().toLocaleTimeString()
  await Person.countDocuments().then(count => {
    res.send(
      `<p>Phonebook has ${count} entries</p>
      <h4>${date} ${time} GMT +0200 (Eastern European Standart Time)</h4>`)
  })
})

peopleRouter.delete('/api/persons/:id', async (req, res) => {
  const id = req.params.id
  await Person.findByIdAndRemove(id)
  res.status(204).end()
})

peopleRouter.post('/api/persons', async (req, res) => {
  const body = req.body
  const token = getTokenFrom(req)

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const person = new Person({
    name: body.name,
    number: body.number,
    user: user._id
  })
  const savedPerson = await person.save()
  user.records = user.records.concat(savedPerson._id)
  await user.save()
  res.json(savedPerson.toJSON())
})

peopleRouter.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const id = req.params.id
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(id, person, { new:true }).then(result => {
    res.json(result.toJSON())
  })
    .catch(error => next(error))
})

module.exports = peopleRouter