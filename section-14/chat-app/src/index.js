const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const Filter = require('bad-words');
const {generateMessage, generateLocationMessage} = require('./utils/messages');

const pathToPublicDirectory = path.join(__dirname, "../public")
const app = express();
app.use(express.static(pathToPublicDirectory));

//we need to use epress slight differently when using socket.io
const server = http.createServer(app);

//socket.io alwys expects a 'http' server, that's why in previous step we explicylty created one
const io = socketio(server)

//Port configuration
const port = process.env.PORT || 3000


app.get("/", (req, res)=>{
    res.send("index")
})

// app.listen(port, () => {
//     console.log(`Server is running on ${port}.`)
// })



/*
server(emit) -> client(receive) -> countUpdated Evenet
client(emit) -> server(receive) -> incremented Event
*/

let count = 0;
//io.on(<eventname>, <call back func runs on event>)
io.on("connection", (socket)=>{
    console.log("New socket.io connection.")

    // Playground for socket.io emit and listen
    // //sendig an event from server(index.js) to client(chat.js)
    // //This event could be anything x,y,z
    // socket.emit("countUpdated", count) // Here we r not using io.emit() bcz we dont want to send the count to all conenctions

    // //Listen the event sent by client chat.js
    // socket.on('incremented', ()=>{
    //     count++ ;
    //     //socket.emit("countUpdated", count) 
    //     //socket.emit emits only to one conenction at a time hence if 3 connctons ar there other two will not get same response from erver

    //     io.emit('countUpdated', count)
    //})


    // CODE CHALLENEG // 
    // Commenting this as we are gonne use it inside room
    // Server will send welcome message to new user
    //socket.emit("message", generateMessage("Server: Welcome to you user!"));


    //Broad case message to all user except the user who just joined.
    //MOving this to join room
    //socket.broadcast.emit("message", generateMessage("A new user has joined."));

    //Broadcast when an user left
    // NOTE: io.on is only for connection, for disconnetion we need to use socket
    socket.on('disconnect', ()=>{
        //socket.broadcast.emit("message", "A user has left.")
        //socket broadcast will also works but as user already left so no harm in using io.emit
        io.emit("message", generateMessage("A user has left."));
        
    })

    // Server lisening the client data
    // socket.on("sendMessage", (inputTextReceived)=>{
    //     //console.log(`Serverside: Client send data: ${inputTextReceived}`);
    //     //Server will relying the message to all connected users
    //     io.emit("message", inputTextReceived)
    // })


    //Receiving the username and room name of join page from client
    socket.on('join', ({username, room}) => {
        //socket.join onl be used at server side
        socket.join(room)

        //socket.emit(specfic client)
        //io.emit(To all connected client)
        //socket.broadcast.emit(To all connected clients except the current one)
        //io.to.emit (Emit an event to everybody inside a room)
        //socket.broadcast.to().emit (Emit an event to all connected user except current one inside a room)

        // Server will send welcome message to new user
        socket.emit("message", generateMessage("Welcome!"));
        socket.broadcast.to(room).emit("message", generateMessage(`${username} has joined the ${room} room.`));



    })

    // As user senidg a callback in epetation of an acknowledgemnt we can rewite above code
    socket.on('sendMessage', (inputTextReceived, callback) => {

        // Check for profanity in user text
        const filter = new Filter();
        if(filter.isProfane(inputTextReceived)){
            return callback("Profanity not allowed in text messages.")
        
        }

        //for nowhardcoded the room name 
        io.to('hot').emit("message", generateMessage(inputTextReceived));
        callback(); //just executing the callback send by user
    } )

    //Server listenng the location data
    socket.on("sendLocation", (locationData, callback)=>{
        if(!locationData){
            return callback("No location data received from user.")
        }

        // io.emit("message", `https://google.com/maps?q=${locationData.latitude},${locationData.longitude}`)
        // callback();

        //Server emits the locations url
        io.emit("locationMessage", generateLocationMessage(`https://google.com/maps?q=${locationData.latitude},${locationData.longitude}`, locationData.timeStamp));
        callback();
    })


})

server.listen(port, () => {
    console.log(`Server is running on ${port}.`)
})