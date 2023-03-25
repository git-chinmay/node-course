const request = require('supertest');
const app = require('../src/app');
const user = require('../src/models/users')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userOneObjectId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneObjectId,
    name: "Mike",
    email: "mike@email.com",
    password: "testPass",
    tokens:[{
        token: jwt.sign({_id: userOneObjectId}, process.env.JWT_SECRET)
    }]
}

// We need to wipe out the existing data always before running the tests otherwise it will fail 
// becaus ethese users were already tere due to previous test run.
beforeEach(async ()=>{
    await user.User.deleteMany();
    await new user.User(userOne).save();
})


test("Should sign up a new user", async () => {
    const response = await request(app).post('/users').send({
        name: "Lance",
        email: "lance@email.com",
        password: "myPass077"
    }).expect(201)

    //Assert that database was changed correctly
    const dbuser = await user.User.findById(response.body.user._id);
    expect(dbuser).not.toBeNull()

    //Assertions about the response
    expect(response.body).toMatchObject({
        user:{
            name: "Lance",
            email: "lance@email.com",
        },
        token:dbuser.tokens[0].token
    })

    //Assertions about the password not stored as plaintext in db
    expect(dbuser.password).not.toBe("myPass077")
})


test("Should login existing user", async ()=>{
    const response = await request(app).post("/users/login").send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    //Assertion that logged in user have same token as 2nd token in db(1token: when user created, 2nd token: when user logged in)
    //const dbuser = await user.User.findById(response.body.user._id); //It same as below
    const dbuser = await user.User.findById(userOneObjectId);
    expect(response.body.token).toBe(dbuser.tokens[1].token)
})


test("Should not login non existing user", async ()=>{
    await request(app).post("/users/login").send({
        email: "random user",
        password: "wrong password"
    }).expect(400)
})


test("Should get profile for user", async ()=>{
    await request(app)
            .get("/users/me")
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200)
})

test("Should not get profile for unauthenicated user", async ()=>{
    await request(app)
            .get("/users/me")
            .send()
            .expect(401)
})


test("Should delete account for user", async ()=>{
    await request(app)
            .delete("/users/me")
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200)

    //Asserting that user actually deleted from db
    const userDb = await user.User.findById(userOneObjectId);
    expect(userDb).toBeNull()
})


test("Should not delete account for unauthenticated user", async ()=>{
    await request(app)
            .delete("/users/me")
            .send()
            .expect(401)
})

// test("Should upload avatar images", async ()=> {
//     await request(app)
//             .post("/users/me/avatar")
//             .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
//             .attach("avatar", "tests/fixture/profile-pic.jpg")
//             .expect(200)
    
//     const dbuser1 = user.User.findById(userOneObjectId)
//     //expect({}).toBe({}) // not equal as toBe uses === in backend which always throw not equal for objects(2 objects have different memory locations)
//     //expect({}).toEqual({}) //It will be equal as it uses some algorithm for comparison
//     expect(dbuser1.avatar).toEqual(expect.any(Buffer));
// })

test("Should update valid user field", async () => {
    await request(app)
            .patch("/users/me")
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send({"name":"cicada"})
            .expect(200)
    const dbuser = await user.User.findById(userOneObjectId);
    expect(dbuser.name).toBe('cicada')

})


test("Should not update invalid user field", async () => {
    await request(app)
            .patch("/users/me")
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send({"gender":"foo"})
            .expect(400)

})


//For our case we dont need the aftereach
// afterEach(()=>{
//     console.log("After each..")
// })