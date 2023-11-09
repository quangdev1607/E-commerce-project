const jwt = require('jsonwebtoken')

const createAccessToken = (uid, role) => jwt.sign(
    { _id: uid, role }, // payload (object muốn hash)
    process.env.JWT_SECRET, // secret key
    { expiresIn: '2d' } // option: khai báo thời gian hết hạn token
)

const createRefreshToken = (uid) => jwt.sign(
    { _id: uid },
    process.env.JWT_SECRET_REFRESH_TOKEN,
    { expiresIn: '7d' }

)

module.exports = {
    createAccessToken,
    createRefreshToken
}