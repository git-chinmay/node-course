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
const auth = require("../middleware/auth")
const router = new express.Router();

// Creat an user
router.post("/users", async (req, res) => {
    console.log(req.body);
    const user = new users.User(req.body);
    try{
        await user.save()
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    }catch (error){
        res.status(400).send(error);
    }
})

// Login an user
router.post("/users/login", async (req, res)=>{
    try{
        //Our custom find & generate token functions
        const user = await users.User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    }catch(e){
        console.log(e);
        res.status(400).send("Login Error!")
    }
})


/*Get all user details (will add mw function 'auth' as 2nd argument so that 
route handle needs auth token to process the request.). Simple right. Just add a 2nd argument.
*/
router.get("/users", auth, async (req, res)=>{

    try{
        const usersx = await users.User.find({});
        res.send(usersx);
    }catch(e){
        res.status(500).send();
    }
})


// Technically we should return only the same user's details who logged in with 
// Own creds. The above /users approach where we are exposing entire database is absolute worng in real world.
// But as learning let keep that endpoint and lets develop new endpoint /users/me to retunr only 
//logged in user's  details

router.get("/users/me", auth, async (req, res)=>{
    res.send(req.user);
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
        // const userx = await users.User.findByIdAndUpdate(req.params.id, 
        //                                                  req.body, {new: true, runValidators: true});

        /* During patch node byapsses the mongoose middleware, it directly updates the table so we need to
        modify our update code to use mongodb opeation so that we can use middleware operations */

        const findUser = await users.User.findById(req.params.id);
        updates.forEach((update)=>{
            findUser[update] = req.body[update];
        })

        //Executing the middleware
        await findUser.save()
                
        if(!findUser){
            return res.status(404).send("No user found");
        }
        res.send(findUser);
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