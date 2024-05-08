const mongoose = require('mongoose');

const errorHandler = (
    error,
    req,
    res,
    next) => {
    if (error instanceof mongoose.Error.ValidationError) {
        res.status(406).json("NOT ACCEPTABLE");
    } else if (error instanceof mongoose.Error.CastError || error instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(404).json("NOT FOUND");
    } else if (error instanceof mongoose.Error.MongoError) {
        res.status(408).json("REQUEST TIMEOUT");
    } else {
        res.status(500).json("SERVER ERROR");
    }
}

module.exports = errorHandler