const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper.js')
const Person = require('../models/person')


beforeEach(async () => {
  await Person.deleteMany({})

  for (let person of helper.initialPeople){
    let personObject = new Person(person)
    await personObject.save()
  }
})

describe('when there is initial records ', () => {
  describe('viewing blogs', () => {
    test('records are returned as json', async () => {
      await api
        .get('/api/persons')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('the first record is John Smith ', async () => {
      const response = await api.get('/api/persons')
      const name = response.body.map(r => r.name)
      expect(name).toContain('John Smith')
    })

    test('there are three records ', async () => {
      const response = await api.get('/api/persons')
      expect(response.body).toHaveLength(helper.initialPeople.length)
    })
    test('specific record can be viewed ', async () => {
      const personsAtStart = await helper.personsInDb()
      const personToView = personsAtStart[0]

      const resultPerson = await api
        .get(`/api/persons/${personToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(resultPerson.body).toEqual(personToView)
    })
    test('request fails if invalid id', async () => {
      const invalidId = '12dadas2121'
      await api
        .get(`/api/persons/${invalidId}`)
        .expect(400)
    })
  })
  describe('adding blogs in the db', () => {
    test('record without name added ', async () => {
      const newRecord = {
        number: 13212313
      }
      await api
        .post('/api/persons')
        .send(newRecord)
        .expect(400)
      const personsAtEnd = await helper.personsInDb()
      expect(personsAtEnd).toHaveLength(helper.initialPeople.length)
    })

    test('record can be added', async () => {
      const newRecord = {
        name: 'Async',
        number: '+1-12313-1231'
      }
      await api
        .post('/api/persons')
        .send(newRecord)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const personsAtEnd = await helper.personsInDb()
      expect(personsAtEnd).toHaveLength(helper.initialPeople.length + 1)
      const names = personsAtEnd.map(p => p.name)
      expect(names).toContain('Async')
    })
  })
  describe('deleting the blog ', () => {
    test('specific record can be deleted ', async () => {
      const personsAtStart = await helper.personsInDb()
      const personToRemove = personsAtStart[1]

      await api
        .delete(`/api/persons/${personToRemove.id}`)
        .expect(204)
      const personsAtEnd = await helper.personsInDb()
      expect(personsAtEnd.length).toBe(personsAtStart.length - 1)
      const names = personsAtEnd.map(p => p.name)
      expect(names).not.toContain(personToRemove.name)
    })
  })
})
afterAll(() => {
  mongoose.connection.close()
})