const express = require('express')
require("./db/mongoose") // This is to make usre mongodb keep running as we dont want to disturb it
const users = require("./models/users")
const tasks = require("./models/tasks")


const app = express();
const port = process.env.PORT || 3000

//Parsing incoming data into object
app.use(express.json());


// Create an User
// app.post("/users", (req, res)=>{
//     console.log(req.body);
//     const user = new users.User(req.body);
//     user.save().then(()=>{
//         res.status(201).send(user);
//     }).catch((error)=>{
//         // res.status(400);
//         // res.send(error);
//         res.status(400).send(error);
//     })

    
// })


// Rewriting above with async -await
app.post("/users", async (req, res) => {
    console.log(req.body);
    const user = new users.User(req.body);
    try{
        await user.save()
        res.status(201).send(user);
    }catch (error) {
        res.status(400).send(error);
    }
})


//Get all user details
// app.get("/users", (req, res)=>{
//     users.User.find({}).then((users)=>{
//         res.send(users);
//     }).catch((e)=>{
//         res.status(500).send();
//     })
// })

app.get("/users", async (req, res)=>{

    try{
        const usersx = await users.User.find({});
        res.send(usersx);
    }catch(e){
        res.status(500).send();
    }
})


//Get an user by id
// app.get("/users/:id", (req, res)=>{
//     //console.log(req.params); //{id: '12345'}
//     const _id = req.params.id;
//     users.User.findById(_id).then((userx) => {
//         if (!userx){
//             return res.status(404).send();
//         }
//         res.send(userx);
//     }).catch((e)=>{
//         res.status(500).send("Something went wrong!");
//     })
// })


app.get("/users/:id", async (req, res)=>{
    //console.log(req.params); //{id: '12345'}
    const _id = req.params.id;
    
    try{

        const user = await users.User.findById(_id)

        if (!user){
            return res.status(404).send();
        }
        res.send(user);

    }catch(e){
        res.status(500).send("Something went wrong!");
        //res.status(500).send(e);
    }
})


//Update an user
//new: tru = create a new user before update
//runValidators - runs the validator
// These two are optiona params to findByIdANdUpdate
app.patch("/users/:id", async (req, res) =>{

    const updates = Object.keys(req.body); //fileds sent by client
    const allowedUpdates = ["name", "age", "email", "password"]
    const isValid = updates.every((update) => {
        return allowedUpdates.includes(update);
    })

    if(!isValid){
        return res.status(400).send("Error: Invalid update.")
    }

    try{
        const userx = await users.User.findByIdAndUpdate(req.params.id, 
                                                         req.body, {new: true, runValidators: true});
                
        if(!userx){
            return res.status(404).send("No user found");
        }
        res.send(userx);
    }
    catch(error){
        res.status(400).send(error);

    }
})


// Delete an user by id
app.delete("/users/:id", async (req, res) => {

    try{
        const deleteUser = await users.User.findByIdAndDelete(req.params.id);
        if(!deleteUser){
            return res.status(404).send("User not found")
        }
        res.send("Deleted");

    }catch(error){
        res.status(500).send(error);
    }
})


// Get all tasks
app.get("/tasks", async (req, res)=>{

    try{
        const taskList = await tasks.Tasks.find({});
        res.send(taskList);
    }catch(e){
        res.status(500).send("Something went wrong!");
    }
})


// Get a task by id
app.get("/tasks/:id", async (req, res)=>{
    const _id = req.params.id;

    try{
        const taskFound = await tasks.Tasks.findById(_id);
        if(!taskFound){
            return res.status(404).send("Task not found!");
        }
        res.send(taskFound);
    }catch(e){
        res.status(500).send("Something went wrong!");
    }
})


// Create a task
app.post("/tasks", async (req, res) =>{
    console.log(req.body);
    const task = new tasks.Tasks(req.body);
    try{
        await task.save()
        res.status(201).send(task);
    }catch(error){
        res.status(400).send(error);
    }
})

// Update a task

app.patch("/tasks/:id", async (req, res)=> {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "completed"]
    const isValid = updates.every((update)=>{
        return allowedUpdates.includes(update);
    })

    if(!isValid){
        return res.status(400).send("Error: Invalid update.")
    }

    try{

        const updatedTask = await tasks.Tasks.findByIdAndUpdate(req.params.id, 
            req.body, {new:true, runValidators:true})

        if(!updatedTask){
            return res.status(404).send("Error: Task not found.")
        }
        res.send(updatedTask);

    }catch(error){
        res.status(400).send(error);

    }
})


// Delete a task by id
app.delete("/tasks/:id", async (req, res) => {

    try{
        const deleteTask = await tasks.Tasks.findByIdAndDelete(req.params.id);
        if(!deleteTask){
            return res.status(404).send("Task not found")
        }
        res.send("Deleted");

    }catch(error){
        res.status(500).send(error);
    }
})



app.listen(port, ()=>{
    console.log(`Server listining on port ${port}`);
})