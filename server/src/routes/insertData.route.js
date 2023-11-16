const router = require('express').Router()
const { insertProduct, insertCategories } = require('../controllers/insertData')

router.post('/', insertProduct)
router.post('/category', insertCategories)

module.exports = router