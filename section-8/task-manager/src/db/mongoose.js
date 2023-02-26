const mongoose = require('mongoose')
const validator = require('validator') //Bcz mongoose does not have much validator functions

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error("Age must be a positive number.");
            }
        }

    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please provide valid email.");
            }
        }
    }
})

const me = new User({
    name: "Alleta ",
    age: 40,
    email: "Alleta_06@gmail.com"
})


me.save().then(()=>{
    console.log(me);
}).catch((error)=>{
    console.log("Error: ",error);
})


// Creating a new model called Tasks
const Tasks = mongoose.model('Tasks', {
    descriptions:{
        type: String
    },

    completed: {
        type: Boolean
    }

})

//Creating a new Task instance

// const task1 = new Tasks({
//     descriptions: "Working on Node Course",
//     completed: false
// })

// task1.save().then(()=>{
//     console.log(task1);
// }).catch((error)=>{
//     console.log("Error: ", error)
// })