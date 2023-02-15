const express = require('express')
const path = require('path') //core module no need to install
const hbs = require('hbs')
const forecast = require('./utils/forecast')


const app = express();
const pathToPublicDirectory = path.join(__dirname, '../public');


//Making express to use the static public folder for rendering
app.use(express.static(pathToPublicDirectory))

//Using templatine engine for dynamic rendering
app.set('view engine', 'hbs'); //library installed via npm


//We can tell express where to find views folder otherwise defautly i looks here this app.js present
const pathToView = path.join(__dirname, '../templates/views') //we can also call the 'folder' something else than views
app.set('views', pathToView)

//Creating Partials template
const pathToPartials = path.join(__dirname, '../templates/partials')
hbs.registerPartials(pathToPartials);



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
        title: 'Help Page',
        name: 'chinmay'
    })
})



//Example for learning query search
app.get('/product', (req, res) => {
    //console.log(req.query);
    //console.log(req.query.search); //localhost://product?search=game

    if(!req.query.search){
        return res.send({
            error: "Please provide a search query."
        })
    }

    //We can also use 'else block' if dont want to use 'return'
    res.send({
        products: []
    })
})


//weather page
//Passing JS object, express convert it inot json and returned to webpage
//query string> /weather?address=kashmir
app.get('/weather', (req, res)=>{

    if(!req.query.address){
        return res.send({
            error: "Must provide an address!"
        })

    }

    forecast.foreCast(req.query.address, (error, data) => {
        if (error){
            return res.send({
                error
            })
        }

        res.send({
            address: req.query.address,
            temperture: data,
            unit: 'Centigrade'
        }) 
    })
    // res.send({
    //     address: req.query.address,
    //     temperture: 26,
    //     unit: 'Centigrade'
    // })
})

app.get("/help/*", (req, res) => {
    res.render('404', {
        title: "help/page",
        name: "Chinmay",
        errorMessage: "Help article not found."
    });
})
app.get("*", (req, res) => {
    res.render('404', {
        title: "404 Error",
        name: "Chinmay",
        errorMessage: "Page not found"
    });
})

//Starting the Express server
const port = 3000;
app.listen(port, ()=>{
    console.log(`Server listening on ${port}`);
})