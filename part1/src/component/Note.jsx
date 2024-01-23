const Render = ({notes}) => {
  
  const result = notes.map(note =><li key = {note.id}>{note.content}</li>)
    return (
      <>
        <ul>
          {result}
        </ul>
      </>
    )
  }

export default Render