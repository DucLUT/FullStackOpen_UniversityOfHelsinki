const DeleteButton = (props) => {
    const id = props.id
    const name = props.name
    return (
        <div>
            <button onClick={() => {props.deletePerson(id,name)}}>Delete</button>
        </div>
    )
}

const Display = (props) => {
    const result = props.persons.map((person) => (
        <div key={person.id}>
            <p style={{ display: 'inline-block', marginRight: '10px' }}>{person.name} {person.number}</p>
            <DeleteButton deletePerson={props.Delete} id = {person.id} name = {person.name} />
        </div>
    ));
    return (
        <>
            {result}
        </>
    );
}

export default Display