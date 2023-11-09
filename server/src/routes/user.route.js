const { register } = require('../controllers/User.controller')
const router = require('express').Router()

router.post('/register', register)

module.exports = router