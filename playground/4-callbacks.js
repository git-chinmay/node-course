
// All callbacks does not refers to asynchronous
//callback: Asynchronous
setTimeout(()=>{
    console.log("2 sec up..");
}, 2000);

//callback: Synchronous
const names = ['Angela', 'Robinson', 'Truk'];
const shortNames = names.filter((name)=>{
    return name.length <= 4;
});
console.log(shortNames);


// TASK: Create asynchronous geoCode() function that will return coordinates

//T-1
const geoCode1 = (address) =>{
    const data ={
        latitude: 0,
        longitude: 0
    }

    return data;
}

const geodata1 = geoCode1('paradeep');
console.log("T1", geodata1);

// But in T1 approach although we will get cordibate data but nothing asynchronous happenign here. Its synchronous one.
// How can we make it asynchronous?


//T-2
const geoCode2 = (address) => {
    setTimeout(()=>{
        const data = {
            latitude: 0,
            longitude: 0
        }
        return data;
    }, 2000);   
    
    //return data; // cant do that as data is not defined here
}

const geodata2 = geoCode2('paradeep');
console.log("T2", geodata2);

// But in T2 approach when we introduce asynchronous we are getting undefined for cordinates bcz the return 
// statement is not defined inside geocode2 but its present inside nested function. And JS completing the geocode2
// function before setTimeout got completed and as there is no return for geocode2 we received undefined.
// Then How we will do that?


//T-3
const geoCode = (address, callback) => {
    setTimeout(()=>{
        const data = {
            latitude: 0,
            longitude: 0
        }
        callback(data);
    }, 2000);    
}

geoCode("paradeep", (x)=>{
    console.log("T3",x);
});


// CODE CHALLENGE:

//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

const add = (v1, v2, callback) => {
    setTimeout(()=>{
        const sum = v1 + v2;
        callback(sum);
    }, 2000);
}

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})