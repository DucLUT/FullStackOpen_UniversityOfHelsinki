const mongoose = require('mongoose')

if (process.argv.length < 3){
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const uri = `mongodb+srv://minhduc16032004:${password}@cluster0.37vvf2w.mongodb.net/pbApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", true);

mongoose.connect(uri)
const personSchema = new mongoose.Schema({
    name: String, 
    number: String,
})

const Person = mongoose.model("Person", personSchema)

if (!name && !number){
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}else{
    const person = new Person({
        name: name,
        number: number,
    })
    
    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        console.log(result)
        mongoose.connection.close()
    })
}

