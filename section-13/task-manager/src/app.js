/* 
supertest needs an express app to be used but our app is defined in index.js so we will do some
arrangement for testing.

1- Create this file
2- Copy all content from index.js to it
3- Remove the PORT and app.listen as suprtest doen not need a server to be run for testing
4- Eport the app file

The above steps will work but we will have duplicate codes so lets do some cleanup

5- Remove the codes from index.js
6- Load the app.js into index.js and let the app.listen run in index.js
*/

const express = require('express')
require("./db/mongoose") // This is to make usre mongodb keep running as we dont want to disturb it
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const apiMaintenance = require('./middleware/api-maintenance')

const app = express();

app.use(express.json()); 
app.use(userRouter);
app.use(taskRouter);

module.exports = app;


