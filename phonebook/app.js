const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const peopleRouter = require('./controllers/persons')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

logger.info('connecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true })
  .then(() => {
    logger.info('connected to mongodb ')
  })
  .catch((error) => {
    logger.info('Error connecting to the db, ', error.message)
  })

morgan.token('body', function(req){
  return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use('/', peopleRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.set('json spaces', 1)
app.use(middleware.requestLogger)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app