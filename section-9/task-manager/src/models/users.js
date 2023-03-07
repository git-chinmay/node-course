const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');

/* When we passed the object mongoose model in behind Node convert it to schema.
Here we are explicitly converted it into schema so that we can use middleware feature on it.
What is Middleware? : Its function we use before or after the event happened.
Ref: https://mongoosejs.com/docs/middleware.html
*/

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error("Age must be a positive number.");
            }
        }

    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please provide valid email.");
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error("Password should not conatin 'password' string.");
            }
        }

    }
})

//We need middleware before the event(create user)
userSchema.pre('save', async function(next){
    const user = this;
    console.log("Just before saving!");
    // Hash the password if its not or new password provided as prt of PATCH
    if(user.isModified){
        user.password = await bcrypt.hash(user.password, 8); //8 recomonded value
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
}