const jwt = require('jsonwebtoken');
/*
jwt.sign({}, "") Two arguments 1 = Object, 2 = a string
the token has three parts
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhYmMxMjMiLCJpYXQiOjE2NzgyNjAxMjR9.0rQY_rIRsLj_Q4qxqL4O7gIuFe-Zrnk4hQ-uCJAQ2aU

1st part = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9         = base64 token 'header'
2nd part = eyJfaWQiOiJhYmMxMjMiLCJpYXQiOjE2NzgyNjAxMjR9 = base64 encoded 'payload/body'  
3rd part = 0rQY_rIRsLj_Q4qxqL4O7gIuFe-Zrnk4hQ-uCJAQ2aU  = base64 encoded 'sign'

If we decode the 2nd part in https://www.base64decode.org/ we will get = {"_id":"abc123","iat":1678260124}
iat = issued at - its a timestamp.

The whole purpose of the JWT is to verify the data(i.e {}) via the verifiable signature (string "").
*/

const myFunction = async () => {
    //const token = jwt.sign({_id:'abc123'}, "thisisjsonwebtoken")
    // To add expiry to token use option {expiresIn: "7 days/10 minutes/30 seconds"}
    const token = jwt.sign({_id:'abc123'}, "thisisjsonwebtoken", {expiresIn:'7days'})
    console.log("Json web token: ", token);

    //Lets verify them. Will fail if passed secret do not match
    try{
        const verifiedToken = jwt.verify(token, "thisisjsonwebtoken");
        console.log(verifiedToken);
    }
    catch(e){
        console.log("Could not verify.", e);
    }

}

myFunction();