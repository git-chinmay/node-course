const { calculateTip, farenhitToCelcius, 
    celciusToFarenhit, add } = require('../playground/math')

test("Hello Jest", ()=>{

})

// test("This should fail.", ()=>{
//     throw new Error("New error!")
// })

test('Should calculate total', ()=> {
    const total = calculateTip(10, 0.3)
    if (total !== 13){
        throw new Error('Total should be 13 but got', total)
    }

})

test('Should calculate total with expect()', ()=> {
    const total = calculateTip(10, 0.3)
    expect(total).toBe(13);

})

test('Sould convert 32 F to 0 C', ()=>{
    const temp = farenhitToCelcius(32);
    expect(temp).toBe(0)
})

test("Should convert 0 C to 32 F", ()=>{
    const temp = celciusToFarenhit(0);
    expect(temp).toBe(32);
})

//This will pass bcz once the test callback function completed the
//as it does not throw any error jest will think its a passed test
//It will not wait for the setTimeout delay. Meanse its not waiting for the out of setTimeout function to complete 
//otherwise it would have failed for expect(1)tobe(2)

// test("Test Asynch function", ()=>{
//     setTimeout(()=>{
//         expect(1).toBe(2);
//     }, 2000)
    
// })

//To fix this we have to tell the jest that its a asyn function
//And we can do that by passing a random parameter and call it inside the setTimeout()
//Then we will notice it will fail as expected bcz of expect(1) does not mtch(2)
// test("Test Asynch function True", (x)=>{
//     setTimeout(()=>{
//         expect(1).toBe(2);
//         x()
//     }, 2000)
    
// })


test("Should add two numbers", (done)=>{
    add(2,3).then((sum)=>{
        expect(sum).toBe(5);
        done()
    })
})

//Another way(simple) we can do the above
test("Should ass two numbers async/await", async ()=>{
    const sum = await add(2,3);
    expect(sum).toBe(5);
})