import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Display from './component/display.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' ,id: 1 }
  ]) 
  const [newName, setNewName] = useState('')
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)  
  }
  const addPeople = (e) => {
    e.preventDefault()
    console.log('button clicked', e.target)
    const peopleObject = {
      name: newName,
      id: persons.length + 1
    }
    setPersons(persons.concat(peopleObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addPeople}>
        name: <input value = {newName} onChange = {handleNameChange} />
        <button type="submit">add</button>
    
      </form>
      <h2>Numbers</h2>
      <Display persons = {persons} />
    </div>
  )
}

export default App

