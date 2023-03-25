const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userModel = require('../../src/models/users')
const taskModel = require('../../src/models/tasks')

const userOneObjectId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneObjectId,
    name: "Mike",
    email: "mike@email.com",
    password: "testPass",
    tokens:[{
        token: jwt.sign({_id: userOneObjectId}, process.env.JWT_SECRET)
    }]
}


const userTwoObjectId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoObjectId,
    name: "Leena",
    email: "leena@email.com",
    password: "leenaPass",
    tokens:[{
        token: jwt.sign({_id: userTwoObjectId}, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id : new mongoose.Types.ObjectId(),
    description: 'Test task',
    completed: false,
    owner: userOne._id
}

const taskTwo = {
    _id : new mongoose.Types.ObjectId(),
    description: 'Test task two',
    completed: false,
    owner: userTwo._id
}

const taskThree = {
    _id : new mongoose.Types.ObjectId(),
    description: 'Test task three',
    completed: true,
    owner: userOne._id
}

const setupDatabase = async () => {
    jest.setTimeout(0);
    await userModel.User.deleteMany();
    await taskModel.Tasks.deleteMany();
    await new userModel.User(userOne).save();
    await new userModel.User(userTwo).save();
    await new taskModel.Tasks(taskOne).save();
    await new taskModel.Tasks(taskTwo).save();
    await new taskModel.Tasks(taskThree).save();
}

module.exports = {
    userOneObjectId,
    userTwoObjectId,
    userOne,
    userTwo,
    taskOne,
    taskThree,
    setupDatabase
}