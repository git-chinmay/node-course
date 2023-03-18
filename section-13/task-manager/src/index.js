const express = require('express')
require("./db/mongoose") // This is to make usre mongodb keep running as we dont want to disturb it
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const apiMaintenance = require('./middleware/api-maintenance')


const app = express();
const port = process.env.PORT

//Here we will use our custom defined function in our application
//middleware function to block GET calls
// app.use((req, res, next)=>{
//     console.log(req.method, req.path);
//     if (req.method === "GET"){
//         res.send("GET requests are disabled on this API.")
//     }else{
//         next();
//     }
// })


//CODE CHALLENGE: Block all API calls syaing Maintenance mode
// app.use((req, res, next)=>{
//     // if(req.method){
//     //     res.status(503).send("API is under maintenance. Please come back later!")
//     // }
//     // next();

//     //OR
//     res.status(503).send("API is under maintenance. Please come back later!")

// })


//In realword we use separate middleware folder for these type of work
//app.use(apiMaintenance);

// Here we are using the functions provided by express in our application
app.use(express.json()); //Parsing incoming data into object
app.use(userRouter);
app.use(taskRouter);

//WITHOUT MIDDLEWARE : new request --> run route handler

//WITH MIDDLEWARE : new request --> do something(pre/post thing) --> run route handler


//// PLAYGROUND CODE FOR FILE UPLOAD ////
// const multer = require('multer');
// const upload = multer({
//     dest: 'images',
//     limits:{
//         fileSize: 5000000 //5MB
//     },
//     //Only allowing pdf files
//     fileFilter(req, file, cb){
//         //if(!file.originalname.endsWith('.pdf')){
//         //use regex
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             cb(new Error('Please upload a word document.!')); // If error
//         }
        
//         cb(undefined, true); //if no error
//         // cb(undefined, false); //silently reject the upload, usually nobody use it
//     }
// })

// app.post("/upload", upload.single('upload'),(req, res) => {
//     res.send("File uploaded.")
// })


/// Overiding default multer error with custom error for
// clean and undestandable error
// app.post("/upload", upload.single('upload'), (req, res) => {
//          res.send("File uploaded.")
//     }, (error, req, res, next)=>{
//         res.status(400).send({
//             error: error.message
//         })
//     })

app.listen(port, ()=>{
    console.log(`Server listining on port ${port}`);
})


// Playground code to test. It will not run separately hence using it//

// const userModel = require('../src/models/users')
// const taskModel = require('../src/models/tasks')

// //Finding user details assocaited with a task
// const main = async () => {
//     // const task = await taskModel.Tasks.findById('640ec2762924f51f008a50a6');
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await userModel.User.findById('640ec08dcddb5e1f004bc9bc')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks);
// }

// main()