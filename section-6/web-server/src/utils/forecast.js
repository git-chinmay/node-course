const request = require('postman-request');

//const url = 'http://api.weatherstack.com/current?access_key=5cd06d83c6a1ec72ea659dc2dcdb69c9&query' //for body.error testing


const foreCast = (address, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=5cd06d83c6a1ec72ea659dc2dcdb69c9&query=${address}`
    request({url:url, json:true}, (error, response, body) => {

        if(error){
            callback("Weather service not avilable", undefined);
        }else if(body.error){
            callback("Please specify a valid location identifier using the query parameter.", undefined);
        }else{    
            //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            //const data = JSON.parse(body); As we are using the json=true
            //console.log(body.current);
            //console.log(`${body.current.weather_descriptions[0]} : It is currenlty ${body.current.temperature} degree out but feels like ${body.current.feelslike} degree.`);
            callback(undefined, `${body.current.weather_descriptions[0]} : It is currenlty ${body.current.temperature} degree out but feels like ${body.current.feelslike} degree.`);
    
        } 
    });
}

module.exports = {
    foreCast: foreCast
}