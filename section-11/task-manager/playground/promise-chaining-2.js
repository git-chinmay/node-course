// Practicing promise chaining for tasks document

const tasks = require("../src/models/tasks")
require("../src/db/mongoose")

// tasks.Tasks.findByIdAndDelete('63fc49eecbb94140a0f701de').then((task) => {
//     console.log(task);
//     return tasks.Tasks.countDocuments({completed: false})}
//     ).then((count)=>{
//         console.log(count);
//     }).catch((e)=>{
//         console.log(e);
//     })


// Rewriting above code using async and await

const deleteAndCount = async (id, state) => {
    //const deleted = await tasks.Tasks.findByIdAndDelete(id);
    await tasks.Tasks.findByIdAndDelete(id); //no need to store if we are not using it
    const count = await tasks.Tasks.countDocuments({completed:state})
    return count;
}

deleteAndCount("63fee0ef763da67914204f87", false).then((c) => {
    console.log("Delete task Count: ", c);
}).catch((e) => {
    console.log(e);
})