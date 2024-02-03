const Note = ({note, toggleImportance}) => {
  const label = note.important ? 'make not important' : 'make important'
  return (
    <li>
      {note.content}
      <button onClick = {toggleImportance}>{label}</button>
    </li>
  )
}

const Render = ({notes,substitute}) => {
  const lable = notes.important ? 'make not important' : 'make important'
  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} needs to be toggled`)
  }
  const result = notes.map(note => <Note key = {note.id} note = {note} toggleImportance = {() => toggleImportanceOf}/>)

    return (
      <>
        <ul>
          {result}
        </ul>
      </>
    )
  }

export default Render