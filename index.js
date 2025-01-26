const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config() // Must come before note.js so it can access the .env file

const Person = require('./models/person')
app.use(morgan('tiny'))

app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(requestLogger)

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body
  const person = new Person({ name, number })

  if (!name || !number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', (request, response) => {
  const currentDate = new Date()
  Person.countDocuments({}).then(count => {
    response.send(`Phonebook has info for ${count} people <br> ${currentDate.toString()}`)
  })
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).send({ error: 'name or number missing' })
  }

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      if (updatedPerson) {
        response.json(updatedPerson)
      } else {
        response.status(404).send({ error: 'person not found' })
      }
    })
    .catch(error => {
      if (error.name === 'ValidationError') {
        response.status(400).send({ error: error.message })
      } else {
        next(error)
      }
    })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(unknownEndpoint)
app.use(errorHandler)  // must be last loaded middleware

const PORT = process.env.PORT || 3001
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT} on all interfaces`)
})