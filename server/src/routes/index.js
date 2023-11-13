const userRouter = require('./user.route')
const productRouter = require('./product.route')
const productCategoryRouter = require('./productCategory.route')
const blogCategoryRouter = require('./blogCategory.route')
const blogRouter = require('./blog.route')
const brandRouter = require('./brand.route')

const initRoutes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)
    app.use('/api/productcategory', productCategoryRouter)
    app.use('/api/blogcategory', blogCategoryRouter)
    app.use('/api/blog', blogRouter)
    app.use('/api/brand', brandRouter)
}

module.exports = initRoutes