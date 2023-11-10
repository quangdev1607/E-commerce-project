const Product = require('../models/product')
const { BadRequestError, UnAuthenticatedError, NotFoundError } = require('../errors')
const slugify = require('slugify')
const { StatusCodes } = require('http-status-codes')

class ProductController {
    async createProduct(req, res) {
        const { title, description, brand, price } = req.body
        if (!title || !description || !brand || !price) throw new BadRequestError('missing inputs')
        req.body.slug = slugify(req.body.title)
        const newProduct = await Product.create({ ...req.body })
        res.status(StatusCodes.CREATED).json({
            success: newProduct ? true : false,
            createdProduct: newProduct ? newProduct : 'Cannot create product'
        })
    }

    async getSingleProduct(req, res) {
        const { pid } = req.params
        if (pid.length !== 24) throw new Error('PID is not valid')
        const product = await Product.findById(pid)
        if (!product) throw new NotFoundError('Product not found')
        res.status(StatusCodes.OK).json({
            success: product ? true : false,
            productData: product ? product : 'Something wrong'
        })
    }

    // Filtering, Sorting, Pagination
    async getAllProducts(req, res) {
        const products = await Product.find()
        res.status(StatusCodes.OK).json({
            success: products ? true : false,
            productDatas: products ? products : "Something wrong"
        })
    }

    async deleteProduct(req, res) {
        const { pid } = req.params
        if (pid.length !== 24) throw new Error('PID is not valid')
        const deletedProduct = await Product.findByIdAndDelete(pid)
        res.status(StatusCodes.OK).json({
            success: deletedProduct ? true : false,
            msg: deletedProduct ? `${deletedProduct.slug} product has been deleted` : `Cannot delete product ${deletedProduct.slug}`
        })
    }

    async updateProduct(req, res) {
        const { pid } = req.params

        if (pid.length !== 24) throw new Error('PID is not valid')
        if (req.body && req.body.title) req.body.slug = slugify(req.body.title)

        const product = await Product.findByIdAndUpdate(pid, { ...req.body }, { new: true })

        if (!product) throw new NotFoundError('Product not found')

        res.status(StatusCodes.OK).json({
            success: product ? true : false,
            updatedProduct: product ? product : 'Something wrong'
        })
    }

}

module.exports = new ProductController()