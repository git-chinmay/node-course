// This is client and index.js is our server //

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


/// ELEMENTS ///

const messageForm = document.querySelector('#form-id-1');
const messageInputForm = messageForm.querySelector('input');
const messageButtonForm = messageForm.querySelector('button');
//const inputData = document.querySelector('input'); //This one fine if only 1 input filed inside form
const sendLocationBtn = document.querySelector('#send-location');
const messages = document.querySelector('#messages');


// TEMPLATES
const messageTemplate = document.querySelector('#message-template').innerHTML
const geolocTemplate = document.querySelector('#geoloc-template').innerHTML
const lcnHprlnkTemplate = document.querySelector('#location-hyperlink').innerHTML;

// CODE CHALLENGE //
//We have defined the Mustach & moment in index.html
socket.on("message", (msg)=>{
    console.log(msg)
    const html = Mustache.render(messageTemplate, {
        msg: msg.text,
        createdAt: moment(msg.createdAt).format('hh:mm a') //https://momentjs.com/
    });
    messages.insertAdjacentHTML('beforeend', html); //insert new htmls bottom of the div
})


socket.on("locationMessage", (url)=>{
    console.log(url);
    const html = Mustache.render(lcnHprlnkTemplate, {
        url
    });
    messages.insertAdjacentHTML('beforeend', html);
})


// socket.on("message", (url)=>{
//     console.log(url)
//     const html = Mustache.render(geolocTemplate, {
//         loc: url
//     });
//     messages.insertAdjacentHTML('beforeend', html);
// })

//Listening the data from input field
// document.querySelector('form').addEventListener('submit', (e)=>{
//             e.preventDefault(); //To stop refreshing the browser
//             const inputText = document.querySelector('input').value;
//             console.log("Submit button clicked.")
//             console.log(`Input text: ${inputText}`);

//             //Send the event to server(index.js)
//             socket.emit("sendMessage", inputText);
//         })



// Sharing messages between server & client
messageForm.addEventListener('submit', (e)=>{
    e.preventDefault(); //To stop refreshing the browser

    //Disabling the submit button untill message sent
    messageButtonForm.setAttribute('disabled', 'disabled');

    //const inputText = inputData.value;
    const inputText = e.target.elements.message.value;

    //Send the event to server(index.js)
    //socket.emit("sendMessage", `User: ${inputText}`);

    //User can also send message and expect an acknowledgement from server
    // Here user sending the 'event', 'the text' and a callback func 
    socket.emit("sendMessage", `User: ${inputText}`, (error)=>{

        //Enabling the button
        messageButtonForm.removeAttribute('disabled');

        //Clear the input field & set cursor focus to it
        messageInputForm.value = '';
        messageInputForm.focus();

        if(error){
            return console.log("Error in message delivery.", error)
        }
        console.log("Message delivered.")}
    )
})


/// Sharing geolocation ///
//https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API

sendLocationBtn.addEventListener('click', ()=>{
    if(!navigator.geolocation){
        return alert('Your browser do not support this.');
    }

    //Disabling the button
    sendLocationBtn.setAttribute('disabled', 'disabled');

    //getCurrentPosition do not support promise-async yet so we will use standard callback
    navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position);
        const locationData = {
            latitude: position.coords.latitude, 
            longitude: position.coords.longitude
        }
        //send the location to server
        socket.emit("sendLocation", locationData, (error)=>{
        
            //Enabling the send button
            sendLocationBtn.removeAttribute('disabled');

            if (error){
                console.log(error);
            }

            console.log("Location shared.")
        });
    })


})

