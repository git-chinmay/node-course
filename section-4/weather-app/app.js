const forecast = require('./utils/forecast')


//const city = "paradeep"
//Taking from comamnd line
const city = process.argv[2];

if (city){
    
    forecast.foreCast(city, (error, data)=>{
        if (error){
            return console.log(error);
        }
        console.log(data);
    });

}else{
    console.log("pass the city name as command line argument!")
}
