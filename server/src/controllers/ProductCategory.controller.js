const { BadRequestError, NotFoundError } = require('../errors')
const ProductCategory = require('../models/productCategory')
const { StatusCodes } = require('http-status-codes')

class ProductCategoryController {
    async createCategory(req, res) {
        const { title } = req.body
        if (!title) throw new BadRequestError('title is required')
        const response = await ProductCategory.create(req.body)
        res.status(StatusCodes.OK).json({
            success: response ? true : false,
            category: response ? response : 'Cannot create product category'
        })
    }

    async getAllCategories(req, res) {
        const allCategories = await ProductCategory.find().select('category _id')
        res.status(StatusCodes.OK).json({
            success: true,
            categories: allCategories
        })
    }

    async updateCategory(req, res) {
        const { pcid } = req.params
        const response = await ProductCategory.findByIdAndUpdate(pcid, { ...req.body }, { new: true })
        if (!response) throw new NotFoundError('category not found')
        res.status(StatusCodes.OK).json({
            success: response ? true : false,
            updatedCategory: response ? response : "Cannot update category"
        })
    }

    async deleteCategory(req, res) {
        const { pcid } = req.params
        const deletedCategory = await ProductCategory.findByIdAndDelete(pcid)
        if (!deletedCategory) throw new NotFoundError('category not found')
        res.status(StatusCodes.OK).json({
            success: deletedCategory ? true : false,
            msg: deletedCategory ? `Category ${deletedCategory.title} has been deleted` : 'Cannot delete category'
        })
    }
}

module.exports = new ProductCategoryController()