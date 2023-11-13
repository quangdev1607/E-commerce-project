const Coupon = require('../models/coupon')
const { BadRequestError, NotFoundError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

class CouponController {
    async createCoupon(req, res) {
        const { name, discount, expiry } = req.body
        if (!name || !discount || !expiry) throw new BadRequestError('missing inputs')
        req.body.expiry = Date.now() + Number(expiry) * 24 * 60 * 60 * 1000
        const coupon = await Coupon.create({ ...req.body })
        res.status(StatusCodes.CREATED).json({
            success: coupon ? true : false,
            newCoupon: coupon ? coupon : 'Cannot create coupon'
        })
    }

    async getAllCoupons(req, res) {
        const coupons = await Coupon.find()
        res.status(StatusCodes.OK).json({
            success: true,
            counts: coupons.length,
            coupons
        })
    }

    async updateCoupon(req, res) {
        const { cid } = req.params
        if (cid.length !== 24) throw new BadRequestError('Coupon ID is not valid')
        if (Object.keys(req.body).length === 0) throw new BadRequestError('Nothing to update')
        if (req.body.expiry) {
            req.body.expiry = Date.now() + Number(req.body.expiry) * 24 * 60 * 60 * 1000
        }
        const coupon = await Coupon.findByIdAndUpdate(cid, { ...req.body }, { new: true })
        if (!coupon) throw new NotFoundError('Coupon not found')
        res.status(StatusCodes.OK).json({
            success: true,
            updatedCoupon: coupon
        })
    }

    async deleteCoupon(req, res) {
        const { cid } = req.params
        if (cid.length !== 24) throw new BadRequestError('Coupon ID is not valid')
        const coupon = await Coupon.findByIdAndDelete(cid)
        if (!coupon) throw new NotFoundError('Coupon not found')
        res.status(StatusCodes.OK).json({
            success: true,
            msg: `Coupon'${coupon.name}' has been successfully deleted`
        })
    }

}


module.exports = new CouponController()