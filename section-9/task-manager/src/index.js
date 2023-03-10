const express = require('express')
require("./db/mongoose") // This is to make usre mongodb keep running as we dont want to disturb it
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express();
const port = process.env.PORT || 3000

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
app.use((req, res, next)=>{
    // if(req.method){
    //     res.status(503).send("API is under maintenance. Please come back later!")
    // }
    // next();

    //OR
    res.status(503).send("API is under maintenance. Please come back later!")

})

// Here we are using the functions provided by express in our application
app.use(express.json()); //Parsing incoming data into object
app.use(userRouter);
app.use(taskRouter);

//WITHOUT MIDDLEWARE : new request --> run route handler

//WITH MIDDLEWARE : new request --> do something(pre/post thing) --> run route handler

app.listen(port, ()=>{
    console.log(`Server listining on port ${port}`);
})