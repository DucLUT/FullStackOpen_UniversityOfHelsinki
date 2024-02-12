import { useState, useEffect} from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Display from './component/display.jsx'
import Filter from './component/filter.jsx'
import PersonForm from './component/personform.jsx'
import axios from 'axios'
import phoneservice from './services/phone.js'
import phone from './services/phone.js'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    phone
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response)
      })
  }
  , [])
  console.log('render', persons.length, 'persons')
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)  
  }
  const handleChangeNumber = (event) => {
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
      id: (persons.length + 1).toString()
    }
    if (persons.some(person => person.name === newName)){
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      const person = persons.find(person => person.name === newName)
      const changedPerson = {...person, number: newNumber}
      phoneservice
      .updateNumber(person.id, changedPerson)
      .then(response => {
        console.log(response)
        setPersons(persons.map(person => person.id !== changedPerson.id ? person : changedPerson))
        setNewName('')
        setNewNumber('')
      })
      


    }else{
      phoneservice
      .create(peopleObject)
      .then(response => {
        console.log(response)
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')}
      )}
  }
  const Delete = (id,name) => {
    window.confirm(`Delete ${name}?`)
    console.log('duongdeptrai',id,name)
    phoneservice
      .deletePerson(id)
      .then(response => {
        console.log(response)
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  
  const personToShow = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter = {filter} handleFilter = {handleFilter} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPeople} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleChangeNumber}/>
      <h2>Numbers</h2>
      <Display persons = {personToShow} Delete = {Delete}/>
    </div>
  )
}

export default App

