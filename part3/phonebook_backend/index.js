require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const app = express()
const Person = require('./modules/person')
var cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))

const errorHandler = (error, _request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if (error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }

  next(error)
}


app.get('/', (_req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (_req, res,next) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
    .catch(error => next(error))
})

app.get('/info',(_req,res) => {
  Person.find({}).then(persons => {
    res.send(`<p>Phonebook as info for ${persons.length} people</p>
            <p>${new Date()}</p>`)
  })


})

app.get('/api/persons/:id', (req, res,next) => {
  const id = req.params.id
  Person.findById(id).then(person => {
    res.json(person)
  })
    .catch(error => next(error))

})

app.delete('/api/persons/:id', (req, res,next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})


const checkName = (name) => {
  return Person.findOne({ name:name })
    .then(person => {
      const check = !!person
      console.log(check)
      return check
    }
    )
    .catch(err => {
      console.log('Error checking name', err.message)
      return false
    })
}
app.post('/api/persons', async (req, res,next) => {
  const body = req.body
  console.log(body)

  try {
    const nameExists = await checkName(body.name)
    if (nameExists) {
      return res.status(400).json({
        error: 'name must be unique'
      })
    }

    if (!body.name) {
      return res.status(400).json({
        error: 'name missing'
      })
    }

    if (!body.number) {
      return res.status(400).json({
        error: 'number missing'
      })
    }

    const person = new Person({
      name: body.name,
      number: body.number
    })

    const savedPerson = await person.save()
    res.json(savedPerson)
  } catch(error) {
    next(error)
  }
})
app.put('/api/persons/:id', (req, res,next) => {
  const id = req.params.id
  const body = req.body
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(id, person, { new:true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})


app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

