const { calculateTip } = require('../playground/math')

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