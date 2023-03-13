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
    },

    owner:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User' //referencing User model
    }

});

const Tasks = mongoose.model('Tasks', taskSchema);

module.exports = {
    Tasks
}