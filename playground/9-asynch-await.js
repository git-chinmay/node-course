// const doWork = () =>{

// }
// console.log(doWork()); 
//Returns undefined

// const doWork = async () => { }
// console.log(doWork());
// Output = promise(undefined) - Always retuns a promise fulfilled by the value we definded

// const doWork = async () => { 
//     return "Akira";
// }
// console.log(doWork()); // Promise {'Akira'}

// //As doWork returns a promise then we can use below 
// doWork().then((result)=>{
//     console.log("Result", result);
// }).catch((e)=>{
//     console.log("Error", e);
// })


// //Lets forcefully throw error and catch it
// const doWork1 = async () => { 
//     throw new Error("Rejecting promise");
//     return "Akira";
// }
// console.log(doWork1()); // Promise {'Akira'}

// //As doWork returns a promise then we can use below 
// doWork1().then((result)=>{
//     console.log("Result", result);
// }).catch((e)=>{
//     console.log("Error", e);
// })


//Lets demonostarte use of the 'await'

const add = (a, b) => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(a<0 || b<0){
                return reject("Numbers must be non negative.");
            }
            resolve(a + b);
        }, 2000)
    });
}

// Lets call this asynch function in await way

const doWork = async () =>{
    const sum = await add(1, 99);  
    return sum;
}

//We know add is also retunr a promise so weusually handle it .then().catch() 
//but here with await we are calling it as synchronous function

doWork().then((result)=>{
    console.log("Result", result);
}).catch((e)=>{
    console.log("Error", e);
})


//We can also do the promise chaining very easily and nealty
const doWork2 = async () =>{
    const sum = await add(99, 1);
    const sum2 = await add(sum, 10);
    const sum3 = await add(sum2, -20);
    return sum3
}

doWork2().then((result)=>{
    console.log("Result", result);
}).catch((e)=>{
    console.log("Error:", e);
})

//Note: with await we can go any dpper level of promise chaining without any code complecation
