const { register, allUser, logIn, getOneUser, refreshToken, logOut } = require('../controllers/User.controller')
const router = require('express').Router()
const { verifyAccessToken } = require('../middlewares/verifyToken')

router.post('/register', register)
router.post('/login', logIn)
router.post('/refreshtoken', refreshToken)
router.get('/logout', logOut)
router.get('/current', verifyAccessToken, getOneUser)
router.get('/', allUser)

module.exports = router