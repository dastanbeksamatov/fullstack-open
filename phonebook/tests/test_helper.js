const Person =  require('../models/person')
const User = require('../models/user')

const initialPeople = [
  {
    name: 'John Smith',
    number: '+1-503-213-1321'
  },
  {
    name: 'Jane Doe',
    number: '+1-121-121-3123'
  }
]

const nonExistingId = async () => {
  const person = new Person({ name: 'will be removed soon' })
  await person.save()
  await person.remove()

  return person._id.toString()
}

const personsInDb = async () => {
  const persons = await Person.find({})
  return persons.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialPeople, nonExistingId, personsInDb, usersInDb
}