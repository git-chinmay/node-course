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
const multer = require('multer');
const router = new express.Router();
const sharp = require('sharp'); //for avatr image resizing
const { sendWelcomeEmail, sendCancelEmail } = require('../emails/account')

///// Creat an user ////

router.post("/users", async (req, res) => {
    const user = new users.User(req.body);
    try{
        await user.save()
        //sendWelcomeEmail(user.email, user.name); //As sendgrid email verification did not happen it will fail
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    }catch (error){
        res.status(400).send(error);
    }
})


//// Login an user ////

router.post("/users/login", async (req, res)=>{
    try{
        //Our custom find & generate token functions
        const user = await users.User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        //To hide some user details like password and token
        //No changes needed if we use toJSON in userSchema
        res.send({user, token}); 

        // When we use getProfileData as a custom method in userSchema to hide the details
        //res.send({'user': user.getProfileData(), token})
    }catch(e){
        console.log(e);
        res.status(400).send("Login Error!")
    }
})



///// Logging out an user ////

router.post("/users/logout", auth, async (req, res)=>{
    try{
        // In database each user has a list called tokens(we access it via req.tokens.token)
        // Each time we login a new token get added to the tokens list.
        // Removing the current logged in token from the list
        req.user.tokens = req.user.tokens.filter((tk)=>{
            return tk.token !== req.token; // This req.token is from postman user sent for logout
        })
        
        //saving the filtered token list to database
        await req.user.save();
        res.send("Logged Out!");
    }catch(e){
        res.status(500).send(e);
    }
})


///// Logout all tokens ////

router.post("/users/logoutall", auth, async (req, res)=>{
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send("All tokens cleanedup!");
    }catch (e){
        res.status(500).send(e);
    }
})


//// Get all user details ////

/* will add mw function 'auth' as 2nd argument so that 
route handle needs auth token to process the request. Simple right. Just add a 2nd argument.
*/
router.get("/users", auth, async (req, res)=>{

    try{
        const usersx = await users.User.find({});
        res.send(usersx);
    }catch(e){
        res.status(500).send();
    }
})



//// Get only logged in user profile ////

/* Technically we should return only the same user's details who logged in with 
    Own creds. The above /users approach where we are exposing entire database is absolute worng in real world.
    But as learning let keep that endpoint and lets develop new endpoint /users/me to retunr only 
    logged in user's  details 
*/

router.get("/users/me", auth, async (req, res)=>{
    res.send(req.user);
})


///// Get an user by id /////

/* Actually we dont need this endpoint as we have /users/me because we should not allow others to see
someone else details using the id
*/
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


///// Update an user ////

router.patch("/users/me", auth, async (req, res) =>{

    const updates = Object.keys(req.body); //fields sent by the client
    const allowedUpdates = ["name", "age", "email", "password"]
    const isValid = updates.every((update) => {
        return allowedUpdates.includes(update);
    })

    if(!isValid){
        return res.status(400).send("Error: Invalid update.")
    }

    try{

        updates.forEach((update)=>{
            req.user[update] = req.body[update];
        })

        //Executing the middleware
        await req.user.save()
        res.send(req.user);
    }
    catch(error){
        res.status(400).send(error);

    }
})


//// Delete an user by id ////
router.delete("/users/me", auth, async (req, res) => {

    try{
        //this req.user coming from auth function
        await req.user.remove();
        //sendCancelEmail(req.user.email, req.user.name);
        res.send(req.user);

    }catch(error){
        res.status(500).send(error);
    }
})


// Uploading the file
const upload = multer({
    //dest: 'avatar',// remove it otherwise multer always stores in filesystem which we dont want 
    // bcz it will not work once deployed to AWS/Heroku. We want the image to be openly avlbl for function
    limits:{
        fileSize: 5000000
    },
    //cb= call back
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            cb(new Error("Allowed file format: JPG, JPEG & PNG"))
        }
        cb(undefined, true)
    }
})


//Callback function to handle the error more neatly(json) as multer error s are crowded(html)
//single('avatar')- representing the header key name in postman call
router.post("/users/me/avatar", auth, upload.single('avatar'), async (req, res) => {

    //req.user.avatar = req.file.buffer //this only works when 'dest' removed from multer

    //we will add some image resiszing
    const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer()
    req.user.avatar = buffer //storing sharp modified image unlike ealier the original file 

    await req.user.save();
    res.send("Avatar uploaded.")
}, (error, req, res, next)=>{
    res.status(400).send({
        error: error.message
    })})


//Get the avatar of an user by id
router.get("/users/:id/avatar", async (req, res) => {
    try{
        
        user = await users.User.findById(req.params.id);
        
        if(!user || !user.avatar){
            throw new Error("User or its avatar missing.")
        }

        //setup the header
        res.set('Content-Type', 'image/jpg');
        res.send(user.avatar);
    }catch(e){
        res.status(404).send(e)
    }
})
// Delete the avatar
router.delete("/users/me/avatar", auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save()
    res.send("Avatra Deleted.")
})
module.exports = router