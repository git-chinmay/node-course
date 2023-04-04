const express = require('express');
const path = require('path');

const pathToPublicDirectory = path.join(__dirname, "../public")
const app = express();
app.use(express.static(pathToPublicDirectory));

const port = process.env.PORT || 3000


app.get("/", (req, res)=>{
    res.send("index")
})

app.listen(port, () => {
    console.log(`Server is running on ${port}.`)
})