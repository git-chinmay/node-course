const { calculateTip, farenhitToCelcius, celciusToFarenhit } = require('../playground/math')

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