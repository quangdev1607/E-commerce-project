const router = require('express').Router()
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const { createCategory, getAllCategories, updateCategory, deleteCategory } = require('../controllers/ProductCategory.controller')

router.route('/')
    .get([verifyAccessToken, isAdmin], getAllCategories)
    .post([verifyAccessToken, isAdmin], createCategory)



router.route('/:pcid')
    .put([verifyAccessToken, isAdmin], updateCategory)
    .delete([verifyAccessToken, isAdmin], deleteCategory)
module.exports = router