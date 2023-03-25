const request = require('supertest')
const app = require('../src/app');
const taskModel = require('../src/models/tasks')
const { 
    userOne, 
    userTwo, 
    setupDatabase, 
    taskOne,
    taskThree} = require('./fixtures/db')

beforeEach(setupDatabase)


/*
    thrown: "Exceeded timeout of 5000 ms for a hook.
    Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."
    adding jest.setTimeout() may not work always so people suggesting to use Mocha frmaework instead.
    https://github.com/callstack/react-native-testing-library/issues/995
*/
test("Should create a task", async()=>{
    jest.setTimeout(0);
    const response = await request(app)
                            .post("/tasks")
                            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
                            .send({
                                description: "Task from jest"
                            })
                            .expect(201)

    const dbTask = await taskModel.Tasks.findById(response.body._id)
    expect(dbTask).not.toBeNull()
    expect(dbTask.completed).toEqual(false)
})


test("Should GET all tasks for userOne", async ()=>{
   const response= await request(app)
                .get("/tasks")
                .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
                .send()
                .expect(200)
    
    //console.log("*** response", response);
    expect(response.body.length).toBe(2);
    
})


// For some reason this test case not working as expected.
// The userTwo able to delete the userOne's tasks
test("Should not delete other user's tasks", async ()=>{
    await request(app)
            .delete(`/tasks/${taskOne._id}`)
            .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
            .send()
            .expect(404)

    const dbTask = await taskModel.Tasks.findById(taskOne._id);
    expect(dbTask).not.toBeNull();
})