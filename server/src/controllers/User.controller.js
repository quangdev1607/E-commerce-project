const { StatusCodes } = require('http-status-codes')
const User = require('../models/user')

class UserController {
    async register(req, res) {
        const user = await User.create({ ...req.body })
        res.status(StatusCodes.CREATED).json({ success: true, user })
    }
}

module.exports = new UserController()