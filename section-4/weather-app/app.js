const request = require('postman-request');
const url = 'http://api.weatherstack.com/current?access_key=5cd06d83c6a1ec72ea659dc2dcdb69c9&query=paradeep'
request(url, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body); // Print the raw JSON body
  const data = JSON.parse(body);
  //console.log(data); //print the body in JS object
  console.log(data.current);
});