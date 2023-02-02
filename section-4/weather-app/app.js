const forecast = require('./utils/forecast')

forecast.foreCast("paradeep", (error, data)=>{
    console.log('Error:', error);
    console.log('Data:', data);
});