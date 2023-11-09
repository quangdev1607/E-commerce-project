const { register, allUser, login } = require('../controllers/User.controller')
const router = require('express').Router()

router.get('/', allUser)
router.post('/register', register)
router.post('/login', login)

module.exports = router