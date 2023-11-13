const router = require('express').Router()
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const { createCoupon, getAllCoupons, updateCoupon, deleteCoupon } = require('../controllers/Coupon.controller')

router.route('/')
    .post([verifyAccessToken, isAdmin], createCoupon)
    .get([verifyAccessToken, isAdmin], getAllCoupons)

router.route('/:cid')
    .put([verifyAccessToken, isAdmin], updateCoupon)
    .delete([verifyAccessToken, isAdmin], deleteCoupon)

module.exports = router