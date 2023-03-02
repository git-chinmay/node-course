const users = require("../src/models/users")
require("../src/db/mongoose")

users.User.findByIdAndUpdate('63fce78750913b77f800a430', {age:1}).then((user)=>{
    console.log(user)
    return users.User.countDocuments({age:1})
}).then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
})