const Order = require('../models/order')
const User = require('../models/user')
const Coupon = require('../models/coupon')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors')

class OrderController {
    async createOrder(req, res) {
        const { userId } = req.user
        const { coupon } = req.body

        const userCart = await User.findById(userId).populate('cart.product', 'title price brand').select('cart')
        if (!userCart) throw new NotFoundError('Cart not found')

        const products = userCart?.cart?.map(el => ({
            product: el.product._id,
            amount: el.quantity,
            color: el.color
        }))


        let total = userCart?.cart?.reduce((accum, el) => el.product.price * el.quantity + accum, 0)

        const orderData = { products, total, orderedBy: userId }

        if (coupon) {
            const selectedCoupon = await Coupon.findById(coupon)
            if (!selectedCoupon) throw new NotFoundError('Coupon not found')
            total = Math.round(total * (1 - selectedCoupon?.discount) * 1000) / 1000 || total
            orderData.total = total
            orderData.coupon = coupon
        }
        const order = await Order.create(orderData)

        res.status(StatusCodes.OK).json({
            success: true,
            result: order,
        })
    }
    async updateStatusOrder(req, res) {
        const { oid } = req.params
        if (oid.length !== 24) throw new BadRequestError('Order id is not valid')
        const { status } = req.body
        if (!status) throw new BadRequestError('status is required')
        const response = await Order.findByIdAndUpdate(oid, { status }, { new: true }).select('status')
        res.status(StatusCodes.OK).json({
            success: response ? true : false,
            rs: response ? response : "Cannot change status"
        })
    }

    async getOrderByUser(req, res) {
        const { userId } = req.user
        const userOrders = await Order.find({ orderedBy: userId }).populate('orderedBy', 'firstname lastname email')
        if (!userOrders) throw new NotFoundError('order not found')
        res.status(StatusCodes.OK).json({
            success: true,
            userOrders
        })
    }

    async getOrdersByAdmin(req, res) {
        const allOrders = await Order.find().populate('orderedBy', 'email')
        res.status(200).json({
            success: true,
            total: allOrders.length,
            allOrders
        })
    }

}

module.exports = new OrderController()