const router = require('express').Router()
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const { createOrder, updateStatusOrder, getOrderByUser, getOrdersByAdmin } = require('../controllers/Order.controller')

router.route('/').post(verifyAccessToken, createOrder)

router.route('/user').get(verifyAccessToken, getOrderByUser)
router.route('/admin').get([verifyAccessToken, isAdmin], getOrdersByAdmin)

router.route('/status/:oid').put([verifyAccessToken, isAdmin], updateStatusOrder)

module.exports = router