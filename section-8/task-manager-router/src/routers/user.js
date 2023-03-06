/*
STEPS TO FOLLOW
1 - Load the express server
2 - Create a router instance
3 - export the router instance
4 - register the router instance in index.js app as userROuter
5 - Cut the all the user related router from index.js and paster it here
6 - replace all app. with router
*/

const express = require('express');
const users = require("../models/users")
const router = new express.Router();

// Rewriting above with async -await
router.post("/users", async (req, res) => {
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
router.get("/users", async (req, res)=>{

    try{
        const usersx = await users.User.find({});
        res.send(usersx);
    }catch(e){
        res.status(500).send();
    }
})


//Get an user by id
router.get("/users/:id", async (req, res)=>{
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
router.patch("/users/:id", async (req, res) =>{

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
router.delete("/users/:id", async (req, res) => {

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



module.exports = router