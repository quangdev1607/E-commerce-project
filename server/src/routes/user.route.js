const {
    register,
    allUser,
    logIn,
    getOneUser,
    refreshToken,
    logOut,
    forgotPassword,
    resetPassword,
    deleteUser,
    updateUser,
    updateUserByAdmin } = require('../controllers/User.controller')
const router = require('express').Router()
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/register', register)
router.post('/login', logIn)
router.post('/refreshtoken', refreshToken)
router.get('/logout', logOut)
router.get('/forgotpassword', forgotPassword)
router.get('/current', verifyAccessToken, getOneUser)
router.get('/', verifyAccessToken, isAdmin, allUser)
router.delete('/', verifyAccessToken, isAdmin, deleteUser)
router.put('/resetpassword', resetPassword)
router.put('/update', verifyAccessToken, updateUser)
router.put('/:userId', verifyAccessToken, isAdmin, updateUserByAdmin)


module.exports = router