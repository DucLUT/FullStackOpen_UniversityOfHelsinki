import { useState, useEffect } from 'react'
import Render from './component/Note'
import axios from 'axios'
import noteService from './services/Notes'




const Note = ({note, toggleImportance}) => {
  const label = note.important ? 'make not important' : 'make important'
  return (
    <li>
      {note.content}
      <button onClick = {toggleImportance}>{label}</button>
    </li>
  )
}
const Notification = ({message}) => {
  if (message === null){
    return null
  }
  return (
    <div className = "error">
      {message}
    </div>
  )
}


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some shits happened...')

  useEffect(() => {
    console.log('effect')
    noteService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response)
      })
  }, [])    
  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: (notes.length + 1).toString(),
    }
    noteService
      .create(noteObject)
      .then(response => {
        setNotes(notes.concat(response))
        setNewNote('')
    
      })

    
  }
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)
  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    console.log(note)
    const changeNote = {...note, important: !note.important}
    console.log(changeNote)
    noteService
      .update(id, changeNote)
      .then(response => {
        console.log(response)
        setNotes(notes.map(note => note.id !== id ? note : response))
      })
      .catch(error => {
        setErrorMessage(`Note '${note.content}' was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
    
  }


  
  return(
    <>
    <h1>Notes</h1>
    <Notification message = {errorMessage}/>
    <div>
      <button onClick = {() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
    </div>
    <ul>
      {notesToShow.map(note =>
        <Note key = {note.id} note = {note} toggleImportance = {() => toggleImportanceOf(note.id)}/>
      )}
    </ul>
    <form onSubmit = {addNote}>
      <input value = {newNote} onChange = {handleNoteChange}/>
      <br />
      <button type = "submit">save</button>
    </form>
    </>
  )
}
  


export default App