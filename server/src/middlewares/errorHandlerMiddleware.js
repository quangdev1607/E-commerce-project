const { StatusCodes } = require('http-status-codes')


const notFoundError = (req, res) => res.status(404).send('Page not found')

const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, please try again later',
    }
    // Duplicate Error
    if (err.code && err.code === 11000) {
        customError.msg = `${Object.keys(err.keyValue)} has existed`
        customError.statusCode = StatusCodes.BAD_REQUEST
    }
    console.log("Error:", customError.msg)
    return res.status(customError.statusCode).json({ success: false, msg: customError.msg })
}

module.exports = { notFoundError, errorHandlerMiddleware }