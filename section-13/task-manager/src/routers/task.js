const express = require('express');
const tasks = require("../models/tasks")
const auth = require("../middleware/auth")
const router = new express.Router();

// Get all tasks(with auth)
// router.get("/tasks", async (req, res)=>{

//     try{
//         const taskList = await tasks.Tasks.find({});
//         res.send(taskList);
//     }catch(e){
//         res.status(500).send("Something went wrong!");
//     }
// })

//We can use either populate or find approach

// router.get("/tasks", auth, async (req, res) => {
//     try{
//         //const taskList = await tasks.Tasks.find({owner:req.user._id});
//         //res.send(taskList);

//         //OR populate approach

//         await req.user.populate('tasks').execPopulate()
//         res.send(req.user.tasks);

//     }catch (e){
//         res.status(500).send("Something went wrong!");
//     }

// })


//Adding filter to endpoint (/task?completed=true)
//Adding pagination(/task?limit=10&skip=10)
//Adding sorting(/task?sortBy=createdAt_asc/createdAt_dsc | createdAt:asc/createdAt:dsc)
//Ascending = 1, Descending = -1
router.get("/tasks", auth, async (req, res) => {
    const match = {}
    const sort = {}

    if(req.query.completed){
        //postman will send true/false as a string, we are convertin it into boolean
        match.completed = req.query.completed === 'true' 
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(":")
        sort[parts[0]] = parts[1] === "desc" ? -1 : 1
    }
    try{
        await req.user.populate({
            path:'tasks',
            match, //match:match //its for filter
            options:{
                limit:parseInt(req.query.limit), //Its for pagination
                skip:parseInt(req.query.skip),  // Its for pagination
                sort //Its for sorting
            }

        }).execPopulate()
        res.send(req.user.tasks);

    }catch (e){
        res.status(500).send("Something went wrong!");
    }

})

// Get a task by id (with auth)
router.get("/tasks/:id", auth, async (req, res)=>{
    const _id = req.params.id;

    try{
        //const taskFound = await tasks.Tasks.findById(_id);
        const taskFound = await tasks.Tasks.findOne({_id, owner:req.user._id})
        if(!taskFound){
            return res.status(404).send("Task not found!");
        }
        res.send(taskFound);
    }catch(e){
        res.status(500).send("Something went wrong!");
    }
})


//// Create a task ////

// router.post("/tasks", async (req, res) =>{
//     console.log(req.body);
//     const task = new tasks.Tasks(req.body);
//     try{
//         await task.save()
//         res.status(201).send(task);
//     }catch(error){
//         res.status(400).send(error);
//     }
// })


/* Rewriting the above task with auth and attaching it to user id as owner.*/
router.post("/tasks", auth, async (req, res) =>{
    //console.log(req.body);

    const task = new tasks.Tasks({
        ...req.body,
        owner: req.user._id
    });

    try{
        await task.save()
        res.status(201).send(task);
    }catch(error){
        res.status(400).send(error);
    }
})


// Update a task

router.patch("/tasks/:id", auth, async (req, res)=> {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "completed"]
    const isValid = updates.every((update)=>{
        return allowedUpdates.includes(update);
    })

    if(!isValid){
        return res.status(400).send("Error: Invalid update.")
    }

    try{

        // const updatedTask = await tasks.Tasks.findByIdAndUpdate(req.params.id, 
        //     req.body, {new:true, runValidators:true})

        //const findTaskObject = await tasks.Tasks.findById(req.params.id);
        const findTaskObject = await tasks.Tasks.findOne({_id:req.params.id, owner:req.user._id});
        if(!findTaskObject){
            return res.status(404).send("Error: Task not found.")
        }

        updates.forEach((update)=>{
            findTaskObject[update] = req.body[update];
        })

        //Applying middleware
        await findTaskObject.save()

        res.send(findTaskObject);

    }catch(error){
        res.status(400).send(error);

    }
})


// Delete a task by id
router.delete("/tasks/:id", auth, async (req, res) => {

    try{
        //const deleteTask = await tasks.Tasks.findByIdAndDelete(req.params.id);
        const deleteTask = await tasks.Tasks.findByIdAndDelete({_id:req.params.id, owner:req.user._id});
        
        if(!deleteTask){
            return res.status(404).send("Task not found")
        }
        res.send("Deleted");

    }catch(error){
        res.status(500).send(error);
    }
})

module.exports = router