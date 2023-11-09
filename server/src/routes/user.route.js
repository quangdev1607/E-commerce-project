const { register, allUser, logIn, getOneUser, refreshToken, logOut, forgotPassword, resetPassword } = require('../controllers/User.controller')
const router = require('express').Router()
const { verifyAccessToken } = require('../middlewares/verifyToken')

router.post('/register', register)
router.post('/login', logIn)
router.post('/refreshtoken', refreshToken)
router.get('/logout', logOut)
router.get('/forgotpassword', forgotPassword)
router.get('/current', verifyAccessToken, getOneUser)
router.get('/', allUser)
router.put('/resetpassword', resetPassword)

module.exports = router