const { StatusCodes } = require('http-status-codes')
const User = require('../models/user')
const { BadRequestError, UnAuthenticatedError } = require('../errors')
const { createAccessToken, createRefreshToken } = require('../middlewares/jwt')
const jwt = require('jsonwebtoken')

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

    async logIn(req, res) {
        const { email, password } = req.body

        // Bỏ trống email hoặc password
        if (!email || !password) throw new BadRequestError('Missing inputs')

        const user = await User.findOne({ email })

        if (user && await user.comparePassword(password)) {
            // Tách password và role ra khỏi user object
            const { password, role, ...userData } = user._doc

            //Tạo accessToken
            const accessToken = createAccessToken(user._id, role)

            // Tạo refreshToken
            const refreshToken = createRefreshToken(user._id)

            // Lưu refreshToken vào db
            await User.findByIdAndUpdate(user._id, { refreshToken }, { new: true }) // new:true => trả data sau khi update

            // Lưu refreshToken vào cookie
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })


            res.status(StatusCodes.OK).json({
                success: user ? true : false,
                accessToken,
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

    async getOneUser(req, res) {
        const { _id } = req.user
        const user = await User.findById(_id).select('-refreshToken -password -role')
        return res.status(StatusCodes.OK).json({
            success: user ? true : false,
            result: user ? user : 'User not found'
        })
    }

    async refreshToken(req, res) {
        // Lấy refresh token từ Cookie
        const cookie = req.cookies

        // Kiểm tra có cookie hay token trong cookie  hay không
        if (!cookie || !cookie.refreshToken) throw new Error('No refresh token in cookies')

        const payload = jwt.verify(cookie.refreshToken, process.env.JWT_SECRET_REFRESH_TOKEN)
        const user = await User.findOne({ _id: payload._id, refreshToken: cookie.refreshToken })
        res.status(StatusCodes.OK).json({
            success: user ? true : false,
            newAccessToken: user
                ? createAccessToken({ _id: user._id, role: user.role })
                : "Cannot found refresh token"
        })
    }

    async logOut(req, res) {
        const cookie = req.cookies
        if (!cookie || !cookie.refreshToken) throw new Error('Cannot found refresh token')
        // Reset refresh token thành chuỗi rỗng
        const user = await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, { new: true })


        // Xóa refresh token ở cookie trình duyệt
        res.clearCookie('refreshToken', {
            httpOnly: true,
        })

        res.status(StatusCodes.OK).json({
            success: user ? true : false,
            msg: user ? "Logout successfully" : "Can not logout, please try again"
        })
    }
}

module.exports = new UserController()