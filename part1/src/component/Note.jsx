const Render = ({notes}) => {
  
  const result = notes.map(note =><li key = {note.id}>{note.content}</li>)
    return (
      <div>
        <h1>Notes</h1>
        <ul>
          {result}
        </ul>
      </div>
    )
  }

export default Render