const request = require('supertest');
const app = require('../src/app');

test("Should sign up a new user", async () => {
    await await request(app).post('/users').send({
        name: "Lance",
        email: "lance@email.com",
        password: "myPass077"
    }).expect(201)
})