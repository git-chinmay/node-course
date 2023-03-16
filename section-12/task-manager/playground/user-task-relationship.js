/*
Learning relationship between user and task models.
*/

const userModel = require('../src/models/users')
const taskModel = require('../src/models/tasks')

//Finding user details assocaited with a task
const main = async () => {
    const task = await taskModel.Tasks.findById('640ec2762924f51f008a50a6');
    await task.populate('tasks').execPopulate()
    console.log(task.owner)
}

main()