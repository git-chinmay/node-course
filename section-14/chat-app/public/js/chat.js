// This is client and index.js is our server

const socket = io() //This is working because we have added /socket.io inside html file

// PLAYGROUND FOR CLIENT SIDE SOCKETIO //
// //Make sure this event matches ith vent in index.js io.on()
// //This is part of communication from server to client
// socket.on("countUpdated", (count)=>{
//     console.log("The count has been updated.", count)
// })


// //This is demonostrating communication from client to server 
// document.querySelector('#increment').addEventListener('click', ()=>{
//     console.log('clicked');
//     //Now emit an event and server will listen it
//     socket.emit('incremented')
// })

// CODE CHALLENGE //
socket.on("message", (greeting_text)=>{
    console.log(greeting_text)
})

//Listening the data from input field
// document.querySelector('form').addEventListener('submit', (e)=>{
//             e.preventDefault(); //To stop refreshing the browser
//             const inputText = document.querySelector('input').value;
//             console.log("Submit button clicked.")
//             console.log(`Input text: ${inputText}`);

//             //Send the event to server(index.js)
//             socket.emit("sendMessage", inputText);
//         })

const getData = document.querySelector('#form-id-1');
//const inputData = document.querySelector('input'); //This one fine if only 1 input filed inside form


getData.addEventListener('submit', (e)=>{
    e.preventDefault(); //To stop refreshing the browser
    //const inputText = inputData.value;
    const inputText = e.target.elements.message.value;

    //Send the event to server(index.js)
    socket.emit("sendMessage", `User: ${inputText}`);
})

//sharing geolocation
//https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
document.querySelector('#send-location').addEventListener('click', ()=>{
    if(!navigator.geolocation){
        return alert('Your browser do not support this.');
    }

    //getCurrentPosition do not support promise-async yet so we will use standard callback
    navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position);
        const locationData = {
            latitude: position.coords.latitude, 
            longitude: position.coords.longitude
        }
        //send the location to server
        socket.emit("sendLocation", locationData);
    })



})