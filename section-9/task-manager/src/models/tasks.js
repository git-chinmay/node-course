const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const taskSchema = new mongoose.Schema({
    description:{
        type: String,
        trim: true,
        required: true
    },

    completed: {
        type: Boolean,
        default: false
    }

});

// Adding middleware check before event
taskSchema.pre("save", async function(next){
    console.log("before the task!");
    // const taskObject = this;
    // if (taskObject.isModified){
    //     taskObject.completed = await bcrypt.hash(taskObject.completed, 8);
    // }
    
    next()
})

const Tasks = mongoose.model('Tasks', taskSchema);

module.exports = {
    Tasks
}