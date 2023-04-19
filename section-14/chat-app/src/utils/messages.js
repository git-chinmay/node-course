const generateMessage = (text) =>{
    return {
        text,
        createdAt: new Date().getTime()
    }
}

// const generateLocationMessage = (url) => {
//     return {
//         url,
//         createdAt: new Date().getTime()
//     }
// }


// We can use the geolocation generated timestamp so we dont need to creat explicity
const generateLocationMessage = (url, timeStamp) => {
    return {
        url,
        createdAt: timeStamp
    }
}


module.exports = {
    generateMessage,
    generateLocationMessage
}