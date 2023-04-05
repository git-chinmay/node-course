const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

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

    //sendig an event from server(index.js) to client(chat.js)
    //This event could be anything x,y,z
    socket.emit("countUpdated", count) // Here we r not using io.emit() bcz we dont want to send the count to all conenctions

    //Listen the venet sent by client chat.js
    socket.on('incremented', ()=>{
        count++ ;
        //socket.emit("countUpdated", count) 
        //socket.emit emits only to one conenction at a time hence if 3 connctons ar there other two will not get same response from erver

        io.emit('countUpdated', count)
    })
})

server.listen(port, () => {
    console.log(`Server is running on ${port}.`)
})