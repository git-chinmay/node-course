const users = require("../src/models/users")
require("../src/db/mongoose")

// users.User.findByIdAndUpdate('63fce78750913b77f800a430', {age:1}).then((user)=>{
//     console.log(user)
//     return users.User.countDocuments({age:1})
// }).then((result)=>{
//     console.log(result);
// }).catch((e)=>{
//     console.log(e);
// })



// Rewriting above code using async and awit
const updateAgeandCount = async (id, age) => {
    const user = await users.User.findByIdAndUpdate(id, {age}); // age:age = age
    const count = await users.User.countDocuments({age});
    return count;
}

updateAgeandCount("63fe2ffc0bd46e73ac5c9073", 20).then((c)=>{
    console.log("Count", c);
}).catch((e)=>{
    console.log('Error', e);
})