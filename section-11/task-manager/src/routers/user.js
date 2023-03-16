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


///// Creat an user ////

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

//new: tru = create a new user before update
//runValidators - runs the validator
// These two are optiona params to findByIdANdUpdate
// router.patch("/users/:id", async (req, res) =>{

//     const updates = Object.keys(req.body); //fileds sent by client
//     const allowedUpdates = ["name", "age", "email", "password"]
//     const isValid = updates.every((update) => {
//         return allowedUpdates.includes(update);
//     })

//     if(!isValid){
//         return res.status(400).send("Error: Invalid update.")
//     }

//     try{
//         // const userx = await users.User.findByIdAndUpdate(req.params.id, 
//         //                                                  req.body, {new: true, runValidators: true});

//         /* During patch node byapsses the mongoose middleware, it directly updates the table so we need to
//         modify our update code to use mongodb opeation so that we can use middleware operations */

//         const findUser = await users.User.findById(req.params.id);
//         updates.forEach((update)=>{
//             findUser[update] = req.body[update];
//         })

//         //Executing the middleware
//         await findUser.save()
                
//         if(!findUser){
//             return res.status(404).send("No user found");
//         }
//         res.send(findUser);
//     }
//     catch(error){
//         res.status(400).send(error);

//     }
// })


/*Rewriting the patch function to use /user/me endpoint and 'auth' bcz we want only authenticated user should able
to update the own profile and we dont want to use /:id anymore.
*/
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

// router.delete("/users/:id", async (req, res) => {

//     try{
//         const deleteUser = await users.User.findByIdAndDelete(req.params.id);
//         if(!deleteUser){
//             return res.status(404).send("User not found")
//         }
//         res.send("Deleted");

//     }catch(error){
//         res.status(500).send(error);
//     }
// })

//We can rewrite the delete user endpoint with more elegant way with authetication
router.delete("/users/me", auth, async (req, res) => {

    try{
        //this req.user coming from auth function
        await req.user.remove();
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
    req.user.avatar = req.file.buffer //this only works when 'dest' removed from multer
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