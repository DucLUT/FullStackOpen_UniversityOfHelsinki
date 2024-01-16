const Display = (props) => {
    const result = props.persons.map((person) => <p key = {person.id}>{person.name} {person.number}</p> )
    return (
        <>

        {result} 
        </>
    )
}

export default Display