require('dotenv').config();
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
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/info',(req,res) => {
    Person.find({}).then(persons => {
        res.send(`<p>Phonebook as info for ${persons.length} people</p>
            <p>${new Date()}</p>`)
    })
    

})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.findById(id).then(person => {
        res.json(person)
    })
    
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    res.status(204).end()
})


const checkName = (name) => {
    return Person.findOne({name:name})
        .then(person => {
            const check = !!person;
            console.log(check);
            return check;
        }
        )
        .catch(err => {
            console.log(`Error checking name`, err.message)
            return false
        })
}
app.post('/api/persons', async (req, res) => {
    const body = req.body;
    console.log(body);

    try {
        const nameExists = await checkName(body.name);
        if (nameExists) {
            return res.status(400).json({
                error: 'name must be unique'
            });
        }

        if (!body.name) {
            return res.status(400).json({
                error: 'name missing'
            });
        }

        if (!body.number) {
            return res.status(400).json({
                error: 'number missing'
            });
        }

        const person = new Person({
            name: body.name,
            number: body.number
        });

        const savedPerson = await person.save();
        res.json(savedPerson);
    } catch (error) {
        console.error('Error saving person:', error.message);
        res.status(500).json({
            error: 'internal server error'
        });
    }
});




const PORT = process.env.PORT || 3001
app.listen(PORT, () => {    
    console.log(`Server running on port ${PORT}`)
})

