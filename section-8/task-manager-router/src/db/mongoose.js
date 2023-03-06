// This file was for practicing and testing the mongoose//
// The main file is present under src/model

const mongoose = require('mongoose')
const validator = require('validator') //Bcz mongoose does not have much validator functions

//Make sure mongodb engine is up and running in your terminal
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useCreateIndex: true
})