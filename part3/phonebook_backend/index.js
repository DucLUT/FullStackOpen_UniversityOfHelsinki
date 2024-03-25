const express = require('express')
var morgan = require('morgan')
const app = express()

app.use(express.json())
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
let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info',(req,res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
              <p>${new Date()}</p>`)

})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    res.status(204).end()
})

const generateId = () => {
    const maxID = persons.length > 0 ? Math.max(...persons.map(n => n.id)) : 0
    return maxID + 1
}

const checkName = (name) => {
    const check = persons.some(person => person.name === name)
    console.log(check)
    return check
}
app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log(body)
    if (checkName(body.name)){
        return res.status(400).json({
            error: 'name must be unique'
        })
    }
    
    if(!body.name){
        return res.status(400).json({
            error: 'name missing'
        })
    }
    if(!body.number){
        return res.status(400).json({
            error: 'number missing'
        })
    }
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)
    res.json(person)
   
})




const PORT = 3001
app.listen(PORT, () => {    
    console.log(`Server running on port ${PORT}`)
})

