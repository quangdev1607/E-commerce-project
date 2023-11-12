const Product = require('../models/product')
const { BadRequestError, UnAuthenticatedError, NotFoundError } = require('../errors')
const slugify = require('slugify')
const { StatusCodes } = require('http-status-codes')
const product = require('../models/product')


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
        // Nếu gán queries = req.query thì nó sẽ trỏ queries về cùng 1 ô với req.query => Không phải copy
        // Gán như kiểu dưới thì sẽ tạo ra một ô mới và cop dữ liệu của req.query
        const queries = { ...req.query }

        // Tách các trường đặc biệt ra khỏi query
        const excludedFields = ['limit', 'sort', 'page', 'fields'] // 'fields' giúp trả về đúng dữ liệu mà client yêu cầu, không thừa không thiếu
        excludedFields.forEach(item => delete queries[item])

        // Format lại các operator cho đúng cú pháp của Mongodb
        let queryString = JSON.stringify(queries)
        queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchEl => `$${matchEl}`)
        const formatedQueries = JSON.parse(queryString)


        // Filtering
        if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: 'i' }
        if (queries?.brand) formatedQueries.brand = { $regex: queries.brand, $options: 'i' }


        let result = Product.find(formatedQueries)

        // Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ')
            result = result.sort(sortBy)
        } else {
            result = result.sort('-createdAt') // Auto sắp xếp theo latest
        }

        // Fields
        if (req.query.fields) {
            const fieldList = req.query.fields.split(',').join(' ')
            result = result.select(fieldList)
        } else {
            result = result.select('-__v')
        }

        // Paginations:
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const skip = (page - 1) * limit
        result = result.skip(skip).limit(limit)

        // Execute query command
        // Số lượng sp thỏa mãn điều kiện !== Số lượng sản phẩm trả về 1 lần gọi API
        /*
        viết trên query: price[gt] = 12000 
                         price[gte] = 3000
            => price: {$gt : 12000, $gte : 3000}
        */
        const products = await result
        if (!products) throw new NotFoundError('Product not found')
        res.status(StatusCodes.OK).json({
            success: products ? true : false,
            data: products ? products : 'Something wrong',
            counts: products ? products.length : 'Something wrong'
        })



    }

    async deleteProduct(req, res) {
        const { pid } = req.params
        if (pid.length !== 24) throw new Error('PID is not valid')
        const deletedProduct = await Product.findByIdAndDelete(pid)
        if (!deletedProduct) throw new NotFoundError('Product not found')
        res.status(StatusCodes.OK).json({
            success: deletedProduct ? true : false,
            msg: deletedProduct ? `${deletedProduct.slug} product has been deleted` : 'Something is wrong'
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