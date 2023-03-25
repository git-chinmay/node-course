const users = require("../models/users")
const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {

    try{
        // Extract the token sent by the user as header
        const token = req.header('Authorization').replace("Bearer ", '')
        // console.log("Token from postman", token);

        // Validating the incoming token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Find an existing user with given id which has the same incoming token
        const user = await users.User.findOne({ '_id': decoded._id, 'tokens.token': token}) 
        // console.log("user", user)

        if(!user){
            throw new Error();
        }

        //We will need it in logout router to logout a user logged in with specific token
        req.token = token;
        
        //We can pass the user data to route handler so that it does not have do it again
        req.user = user

        next()

    }catch (e){
        res.status(401).send({"error": "Please authenticate!"})
    }

}

module.exports = auth

// NOTE: we will not use it in index.js as that will apply it all routes
// we want authentication only in user routes so we will import their