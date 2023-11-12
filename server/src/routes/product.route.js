const router = require('express').Router()
const { createProduct, getSingleProduct, getAllProducts, deleteProduct, updateProduct } = require('../controllers/Product.controller')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

// router.post('/', verifyAccessToken, isAdmin, createProduct)
// router.get('/', getAllProducts)
// router.get('/:pid', getSingleProduct)
// router.delete('/:pid', verifyAccessToken, isAdmin, deleteProduct)
// router.put('/:pid', verifyAccessToken, isAdmin, updateProduct)

router.route('/').post([verifyAccessToken, isAdmin], createProduct).get(getAllProducts)
router.route('/:pid').get(getSingleProduct).delete([verifyAccessToken, isAdmin], deleteProduct).put([verifyAccessToken, isAdmin], updateProduct)

module.exports = router
