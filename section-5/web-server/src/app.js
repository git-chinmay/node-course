const express = require('express')
const path = require('path') //core module no need to install

// NOTES FOR QUICK LEARNING //
//req = Request received from user
//res = what response server send back
// console.log(__dirname); // gives the current directry
// console.log(__filename); // gived the absolute path of the current script
// console.log(path.join(__dirname, '../public'))


const app = express();
const pathToPublicDirectory = path.join(__dirname, '../public');


//Making express to use the static public folder for rendering
app.use(express.static(pathToPublicDirectory))

//Using templatine engine for dynamic rendering
app.set('view engine', 'hbs'); //library installed via npm


//We can tell express where to find views folder otherwise defautly i looks here this app.js present
const pathToView = path.join(__dirname, '../views') //we can also call the 'folder' something else than views
app.set('views', pathToView)


//Bcz of above static express will never run below root page so we can comment/remove it
//app.com
// app.get('', (req, res)=>{
//     res.send('Hello Express')
// })


///Lets replace the /help and /about page with static html///
//localhost:3000/about.html > give about page
//localhost:3000/help.html > gives help page


//app.com/help
// app.get('/help', (req, res)=>{
//     res.send({
//         name: "Chinmay",
//         location: "India"
//     })
// })

//app/com/about
// app.get('/about', (req, res)=>{
//     res.send('<h1>My Node js based app</h1>')
// })


/// RENDERING HBS ///
app.get('', (req, res) => {
    //res.render('index'); //It will point to the views folder index.hbs file.
    //We can pass values for dynaminsim
    res.render('index', {
        title: 'weather app',
        name: 'chinmay'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'chinmay'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page'
    })
})

//weather page
//Passing JS object, express convert it inot json and returned to webpage
app.get('/weather', (req, res)=>{
    res.send({
        location: "paradeep",
        temperture: 26,
        unit: 'Centigrade'
    })
})

//Starting the Express server
//Callback function is optional
//3000 is not default port. Its developmental port for testing. You can use anything.
//Can use nodemon to autorun all the changes nodemon app.js
app.listen(3000, ()=>{
    console.log("Server listening on 3000");
})