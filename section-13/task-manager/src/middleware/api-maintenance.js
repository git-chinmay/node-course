const apiMaintenance = async (req, res, next) => {
    res.status(503).send("API is under maintenance. Please come back later!");
}

module.exports = apiMaintenance