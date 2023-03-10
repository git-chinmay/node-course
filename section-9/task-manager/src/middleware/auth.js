const auth = (req, res, next) => {
    //res.send("Auth middleware!");
    console.log("Auth MW");
    next();
}

module.exports = auth

// NOTE: we will not use it in index.js as that will apply it all routes
// we want authentication only in user routes so we will import their