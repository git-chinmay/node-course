const express = require('express')
require("./db/mongoose") // This is to make usre mongodb keep running as we dont want to disturb it
const users = require("./models/users")


const app = express();
const port = process.env.PORT || 3000

//Parsing incoming data into object
app.use(express.json());

app.post("/users", (req, res)=>{
    console.log(req.body);
    const user = new users.User(req.body);
    user.save().then(()=>{
        res.send(user);
    }).catch((error)=>{
        // res.status(400);
        // res.send(error);
        res.status(400).send(error);
    })

    
})

app.listen(port, ()=>{
    console.log(`Server listining on port ${port}`);
})