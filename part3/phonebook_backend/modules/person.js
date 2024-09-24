const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const uri = process.env.MONGODB_URI

mongoose.connect(uri)
.then(result => {
    console.log("connect to MONGODB")

})
.catch(error => {
    console.log("error connecting to MongoDB", error.message)
})
const personSchema = new mongoose.Schema({
    name: String, 
    number: String,
})

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Person", personSchema)
