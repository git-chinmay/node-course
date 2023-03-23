const request = require('supertest');
const app = require('../src/app');
const user = require('../src/models/users')

const userOne = {
    name: "Mike",
    email: "mike@email.com",
    password: "testPass"
}

// We need to wipe out the existing data always before running the tests otherwise it will fail 
// becaus ethese users were already tere due to previous test run.
beforeEach(async ()=>{
    await user.User.deleteMany();
    await new user.User(userOne).save();
})


test("Should sign up a new user", async () => {
    await await request(app).post('/users').send({
        name: "Lance",
        email: "lance@email.com",
        password: "myPass077"
    }).expect(201)
})


test("Should login existing user", async ()=>{
    await request(app).post("/users/login").send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})


test("Should not login non existing user", async ()=>{
    await request(app).post("/users/login").send({
        email: "random user",
        password: "wrong password"
    }).expect(400)
})


//For our case we dont need the aftereach
// afterEach(()=>{
//     console.log("After each..")
// })