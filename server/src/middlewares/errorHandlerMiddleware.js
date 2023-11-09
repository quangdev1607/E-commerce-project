const { StatusCodes } = require('http-status-codes')


const notFoundError = (req, res) => res.status(404).send('Page not found')

const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, please try again later',
        signUpError: { firstname: "", lastname: "", email: "", mobile: "", password: "" }
    }
    // Validation Error
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            customError.signUpError[properties.path] = properties.message
            customError.statusCode = StatusCodes.BAD_REQUEST
        })
        return res.status(customError.statusCode).json({ msg: customError.signUpError })

    }
    console.log("Error:", customError.msg)
    return res.status(customError.statusCode).json({ success: false, msg: customError.msg })
}

module.exports = { notFoundError, errorHandlerMiddleware }