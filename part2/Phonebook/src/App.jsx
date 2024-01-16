import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Display from './component/display.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)  
  }
  const handleChangeNumver = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  const addPeople = (e) => {
    e.preventDefault()
    console.log('button clicked', e.target)
    const peopleObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if (persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }else{
      setPersons(persons.concat(peopleObject))
      setNewName('')
      setNewNumber('')
  }
  }
  const personToShow = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value = {filter} onChange = {handleFilter} />
      <h2>add a new</h2>
      <form onSubmit = {addPeople}>
        name: <input value = {newName} onChange = {handleNameChange} />
        <br/>
        number: <input value={newNumber} onChange = {handleChangeNumver}/> 
        <br/>
        <button type="submit">add</button>
    
      </form>
      <h2>Numbers</h2>
      <Display persons = {personToShow} />
    </div>
  )
}

export default App

