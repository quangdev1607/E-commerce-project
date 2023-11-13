const { BadRequestError, NotFoundError } = require('../errors')
const BlogCategory = require('../models/blogCategory')
const { StatusCodes } = require('http-status-codes')

class BlogCategoryController {
    async createCategory(req, res) {
        const { title } = req.body
        if (!title) throw new BadRequestError('title is required')
        const response = await BlogCategory.create(req.body)
        res.status(StatusCodes.OK).json({
            success: response ? true : false,
            category: response ? response : 'Cannot create blog category'
        })
    }

    async getAllCategories(req, res) {
        const allCategories = await BlogCategory.find().select('title _id')
        res.status(StatusCodes.OK).json({
            success: true,
            categories: allCategories
        })
    }

    async updateCategory(req, res) {
        const { bcid } = req.params
        const response = await BlogCategory.findByIdAndUpdate(bcid, { ...req.body }, { new: true })
        if (!response) throw new NotFoundError('category not found')
        res.status(StatusCodes.OK).json({
            success: response ? true : false,
            updatedCategory: response ? response : "Cannot update category"
        })
    }

    async deleteCategory(req, res) {
        const { bcid } = req.params
        const deletedCategory = await BlogCategory.findByIdAndDelete(bcid)
        if (!deletedCategory) throw new NotFoundError('category not found')
        res.status(StatusCodes.OK).json({
            success: deletedCategory ? true : false,
            msg: deletedCategory ? `Category ${deletedCategory.title} has been deleted` : 'Cannot delete category'
        })
    }
}

module.exports = new BlogCategoryController()