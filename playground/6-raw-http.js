//We used request module (npm module) of node (npm install request)
//We can also use raw http request(core node module) for the same purpose(no installation required)
//https://nodejs.org/dist/latest-v19.x/docs/api/http.html

//NOTE: In real world people avoid using core modules as its very complecated
//People prefer custom modules like request and axio

const http = require('http')
const url = 'http://api.weatherstack.com/current?access_key=5cd06d83c6a1ec72ea659dc2dcdb69c9&query=paradeep'

const request = http.request(url, (response)=>{
    var data = ''
    response.on('data', (chunk)=>{
        data = data + chunk.toString();
        //chunk cant be readbale as its buffer value in raw format

    })
    response.on('end', ()=>{
        //print once when all data chunks received
        const body = JSON.parse(data);
        console.log(data);
        

    })
})

//Error handelling
request.on('error', (error)=>{
    console.log(`An Error: ${error}`)
})

request.end();

