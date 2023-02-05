const express = require('express')

const app = express();

//req = Request received from user
//res = what response server send back

//app.com
app.get('', (req, res)=>{
    res.send('Hello Express')
})

//app.com/help
app.get('/help', (req, res)=>{
    res.send('Help Page')
})

//app/com/about
app.get('/about', (req, res)=>{
    res.send('About Page')
})

//weather page
app.get('/weather', (req, res)=>{
    res.send('Weather Page')
})

//Starting the Express server
//Callback function is optional
//3000 is not default port. Its developmental port for testing. You can use anything.
//Can use nodemon to autorun all the changes nodemon app.js
app.listen(3000, ()=>{
    console.log("Server listening on 3000");
})