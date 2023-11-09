const CustomAPIError = require('./customError')
const UnAuthenticatedError = require('./unAuthenticated')
const NotFoundError = require('./notFound')
const BadRequestError = require('./badRequest')

module.exports = {
    CustomAPIError,
    UnAuthenticatedError,
    NotFoundError,
    BadRequestError
}