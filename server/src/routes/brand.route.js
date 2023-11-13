const router = require('express').Router()
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const { createBrand, getAllBrands, updateBrand, deleteBrand } = require('../controllers/Brand.controller')

router.route('/')
    .get([verifyAccessToken, isAdmin], getAllBrands)
    .post([verifyAccessToken, isAdmin], createBrand)



router.route('/:bRid')
    .put([verifyAccessToken, isAdmin], updateBrand)
    .delete([verifyAccessToken, isAdmin], deleteBrand)
module.exports = router