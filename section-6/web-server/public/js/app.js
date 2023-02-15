

console.log("JS script from client side.");

//Fetch is the client side java script code.
//'fetch' is a browser api and can not be used in node directly
fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
})


//Code challenge: Fetch the weather data using browser http request fetch method

const weatherAPI = (location) =>{

    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    
            response.json().then((data) => {
                if (data.error){
                    //console.log(data.error);
                    messageOne.textContent = data.error;
                }else{
                    //console.log(data.address); //using the object from app.js /weather section
                    //console.log(data.temperture);
                    messageOne.textContent = data.address;
                    messageTwo.textContent = data.temperture;
                }
        
        })
    })

}


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault(); // To stop refreshing the browser
    const location = search.value;
    messageTwo.textContent = "";
    messageOne.textContent = 'Loading...'
    weatherAPI(location);
});