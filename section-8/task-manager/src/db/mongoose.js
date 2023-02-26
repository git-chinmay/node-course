const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number

    }
})

// const me = new User({
//     name: "Chinmay",
//     age: 32
// })


// me.save().then(()=>{
//     console.log(me);
// }).catch((error)=>{
//     console.log("Error: ",error);
// })


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

const task1 = new Tasks({
    descriptions: "Working on Node Course",
    completed: false
})

task1.save().then(()=>{
    console.log(task1);
}).catch((error)=>{
    console.log("Error: ", error)
})