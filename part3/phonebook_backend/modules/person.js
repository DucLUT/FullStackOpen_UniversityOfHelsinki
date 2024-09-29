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
    name: {
        type: String,
        minLength: 3,
        required: true
    }, 
    number: {
        type: String,
        validate: {
            validator: (v) => {
                const regex = /^\d{2,3}-\d+$/;
                if (!regex.test(v)){
                    return false;
                }
                const [firstPart, secondPart] = v.split('-');
                return secondPart.length > 6;
            },
            message: props => `${props.value} is not a valid phone number! The number should follow DD-D+ or DDD-D+.`
        },
        required: [true, 'User phone number required']
    },
})

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Person", personSchema)
