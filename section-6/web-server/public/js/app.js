

console.log("JS script from client side.");

//Fetch is the client side java script code.
//'fetch' is a browser api and can not be used in node directly
fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
})


//Code challenge: Fetch the weather data using browser http request fetch method

fetch('http://localhost:3000/weather?address=kashmir').then((response)=>{
    
        response.json().then((data) => {
            if (data.error){
                console.log(data.error);
            }else{
                console.log(data.address); //using the object from app.js /weather section
                console.log(data.temperture);
            }
        
    })
})