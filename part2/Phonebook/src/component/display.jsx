const Display = (props) => {
    const result = props.persons.map((person) => <p key = {person.id}>{person.name}</p> )
    return (
        <>

        {result} 
        </>
    )
}

export default Display