const jwt = require('jsonwebtoken')
const { UnAuthenticatedError } = require('../errors')

const verifyAccessToken = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnAuthenticatedError('Require Authentication')
    }
    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload
        next()
    } catch (error) {
        throw new UnAuthenticatedError('Access token has expired')
    }

}

const isAdmin = async (req, res, next) => {
    const { role } = req.user
    if (role !== 'admin') throw new UnAuthenticatedError('You are not an admin')
    next()
}


module.exports = {
    verifyAccessToken,
    isAdmin
}