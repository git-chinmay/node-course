// This file was for practicing and testing the mongoose//
// The main file is present under src/model

const mongoose = require('mongoose')
const validator = require('validator') //Bcz mongoose does not have much validator functions

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useCreateIndex: true
})

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value){
//             if(value < 0){
//                 throw new Error("Age must be a positive number.");
//             }
//         }

//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error("Please provide valid email.");
//             }
//         }
//     },
//     password:{
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 7,
//         validate(value){
//             if(value.toLowerCase().includes("password")){
//                 throw new Error("Password should not conatin 'password' string.");
//             }
//         }

//     }
// })

// const me = new User({
//     name: "Veronikap",
//     age: 30,
//     email: "veronika@gmail.com",
//     password: "Veron"
// })


// me.save().then(()=>{
//     console.log(me);
// }).catch((error)=>{
//     console.log("Error: ",error);
// })


// Creating a new model called Tasks
const Tasks = mongoose.model('Tasks', {
    descriptions:{
        type: String,
        trim: true,
        required: true
    },

    completed: {
        type: Boolean,
        default: false
    }

})

//Creating a new Task instance

// const task1 = new Tasks({
//     descriptions: "Working on task1 "
//     //completed: false
// })

// task1.save().then(()=>{
//     console.log(task1);
// }).catch((error)=>{
//     console.log("Error: ", error)
// })

// module.export = {
//     mongoose: mongoose
// }