//Practicing CRUD

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

// Connection URL
const connectionURL = 'mongodb://127.0.0.1:27017'; //Do not type localhost bcz it sometimes cause issues

// DB Name
const databaseName = "task-manager-db";

MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client)=>{
    if (error){
        return console.log("Unable to connect to db.");
    }

    console.log("Connected to db.");
    const db = client.db(databaseName);
    db.collection('users').insertOne({
        name: "Andrew",
        age: 30
    })
})

