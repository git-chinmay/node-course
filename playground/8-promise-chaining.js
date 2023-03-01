const add = (a, b) => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(a + b);
        }, 2000)
    });
}

// add(1, 2).then((sum) => {
//     console.log(sum);
// }).catch((e) => {
//     console.log(e)
// })

//What if we want to add new number to sum 
//We could r=write as below
// add(1, 2).then((sum) => {
//     console.log(sum);
//     add(sum, 5).then((sum2) => {
//         console.log(sum2);
//     }).catch((e) => {
//         console.log(e)
//     })
// }).catch((e) => {
//     console.log(e)
// })

//But what is the problem with abve approach?
//Code will get complecated for deeper label chaining
//A lot of duplicate code
// We can rewrite this promise cleaning

add(1, 2).then((sum)=>{
    console.log(sum);
    return add(sum, 5);
}).then((sum2)=>{
    console.log(sum2);
}).catch((e)=>{
    console.log(e);
})