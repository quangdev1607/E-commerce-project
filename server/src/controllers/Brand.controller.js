const { BadRequestError, NotFoundError } = require('../errors')
const Brand = require('../models/brand')
const { StatusCodes } = require('http-status-codes')

class BrandController {
    async createBrand(req, res) {
        const { title } = req.body
        if (!title) throw new BadRequestError('title is required')
        const response = await Brand.create(req.body)
        res.status(StatusCodes.OK).json({
            success: response ? true : false,
            brand: response ? response : 'Cannot create brand'
        })
    }

    async getAllBrands(req, res) {
        const allBrands = await Brand.find()
        res.status(StatusCodes.OK).json({
            success: true,
            brands: allBrands
        })
    }

    async updateBrand(req, res) {
        const { bRid } = req.params
        const response = await Brand.findByIdAndUpdate(bRid, { ...req.body }, { new: true })
        if (!response) throw new NotFoundError('brand not found')
        res.status(StatusCodes.OK).json({
            success: response ? true : false,
            updatedBrand: response ? response : "Cannot update brand"
        })
    }

    async deleteBrand(req, res) {
        const { bRid } = req.params
        const deletedBrand = await Brand.findByIdAndDelete(bRid)
        if (!deletedBrand) throw new NotFoundError('brand not found')
        res.status(StatusCodes.OK).json({
            success: deletedBrand ? true : false,
            msg: deletedBrand ? `Brand ${deletedBrand.title} has been deleted` : 'Cannot delete brand'
        })
    }
}

module.exports = new BrandController()