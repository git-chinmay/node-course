// Callbacks

const doWorkCallback = (callback) => {
    setTimeout(()=>{
        //callback("This is my error", undefined);
        callback(undefined, [1,2,3])
    }, 2000)
}

doWorkCallback((error, result)=>{
    if(error){
        return console.log("There is an error!");
    }
    console.log(result);

});


//Lets do same with Promise
const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(()=>{
        //resolve([1,4,7]) //This same as callback(undefined, [1,4,7])
        reject('Things went wrong') //This same as callback("My error", undefined)
    }, 2000)
})

doWorkPromise.then((result) => {
    console.log("Success!", result)
}).catch((error) => {
    console.log("Error", error)
})