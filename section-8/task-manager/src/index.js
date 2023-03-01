const express = require('express')
require("./db/mongoose") // This is to make usre mongodb keep running as we dont want to disturb it
const users = require("./models/users")
const tasks = require("./models/tasks")


const app = express();
const port = process.env.PORT || 3000

//Parsing incoming data into object
app.use(express.json());


// Create an User
app.post("/users", (req, res)=>{
    console.log(req.body);
    const user = new users.User(req.body);
    user.save().then(()=>{
        res.status(201).send(user);
    }).catch((error)=>{
        // res.status(400);
        // res.send(error);
        res.status(400).send(error);
    })

    
})


//Get all user details
app.get("/users", (req, res)=>{
    users.User.find({}).then((users)=>{
        res.send(users);
    }).catch((e)=>{
        res.status(500).send();
    })
})


//Get an user by id
app.get("/users/:id", (req, res)=>{
    //console.log(req.params); //{id: '12345'}
    const _id = req.params.id;
    users.User.findById(_id).then((userx) => {
        if (!userx){
            return res.status(404).send();
        }
        res.send(userx);
    }).catch((e)=>{
        res.status(500).send("Something went wrong!");
    })
})


// Get all tasks
app.get("/tasks", (req, res)=>{
    tasks.Tasks.find({}).then((taskList)=>{
        res.send(taskList);

    }).catch((error)=>{
        res.status(500).send("Something went wrong!");
    })
})

// Get a task by id
app.get("/tasks/:id", (req, res)=>{
    const _id = req.params.id;
    tasks.Tasks.findById(_id).then((task)=>{
        if(!task){
            res.status(404).send("Task not found!");
        }
        res.send(task);
    }).catch((e)=>{
        res.status(500).send("Something went wrong");
    })
})
// Create a task
app.post("/tasks", (req, res) =>{
    console.log(req.body);
    const task = new tasks.Tasks(req.body);
    task.save().then(()=>{
        res.status(201).send(task);
    }).catch((error)=>{
        res.status(400).send(error);
    })
})

app.listen(port, ()=>{
    console.log(`Server listining on port ${port}`);
})