const { StatusCodes } = require('http-status-codes')
const User = require('../models/user')
const { BadRequestError, UnAuthenticatedError } = require('../errors')

class UserController {
    async register(req, res) {
        /*
        Đoạn code ở dưới sẽ bắt lỗi trước khi chọc vào db, giúp giảm tải cho db
        */
        // Validation Error:
        const { firstname, lastname, email, password } = req.body
        if (!firstname || !lastname || !email || !password) throw new BadRequestError('Missing inputs')

        // Duplicate Error:
        const existedUser = await User.findOne({ email })
        if (existedUser) throw new BadRequestError('user has existed!')

        const user = await User.create({ ...req.body })
        res.status(StatusCodes.CREATED).json({
            success: user ? true : false,
            msg: user ? 'Register successfully, please login' : 'Something wrong, please try again'
        })


    }

    async login(req, res) {
        const { email, password } = req.body

        // Bỏ trống email hoặc password
        if (!email || !password) throw new BadRequestError('Missing inputs')

        const user = await User.findOne({ email })

        if (user && await user.comparePassword(password)) {
            const { password, role, ...userData } = user._doc
            res.status(StatusCodes.OK).json({
                success: user ? true : false,
                userData
            })
        } else {
            throw new UnAuthenticatedError('Invalid Credentials')
        }











    }

    async allUser(req, res) {
        const users = await User.find()
        res.status(StatusCodes.OK).json(users)

    }
}

module.exports = new UserController()