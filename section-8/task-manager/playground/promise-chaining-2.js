// Practicing promise chaining for tasks document

const tasks = require("../src/models/tasks")
require("../src/db/mongoose")

tasks.Tasks.findByIdAndDelete('63fc49eecbb94140a0f701de').then((task) => {
    console.log(task);
    return tasks.Tasks.countDocuments({completed: false})}
    ).then((count)=>{
        console.log(count);
    }).catch((e)=>{
        console.log(e);
    })