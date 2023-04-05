// This is client and index.js is our server

const socket = io() //This is working because we have added /socket.io inside html file

//Make sure this event matches ith vent in index.js io.on()
//This is part of communication from server to client
socket.on("countUpdated", (count)=>{
    console.log("The count has been updated.", count)
})


//This is demonostrating communication from client to server 
document.querySelector('#increment').addEventListener('click', ()=>{
    console.log('clicked');
    //Now emit an event and server will listen it
    socket.emit('incremented')
})