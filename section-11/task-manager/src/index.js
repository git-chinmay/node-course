const express = require('express')
require("./db/mongoose") // This is to make usre mongodb keep running as we dont want to disturb it
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const apiMaintenance = require('./middleware/api-maintenance')


const app = express();
const port = process.env.PORT || 3000



// Here we are using the functions provided by express in our application
app.use(express.json()); //Parsing incoming data into object
app.use(userRouter);
app.use(taskRouter);


app.listen(port, ()=>{
    console.log(`Server listining on port ${port}`);
})