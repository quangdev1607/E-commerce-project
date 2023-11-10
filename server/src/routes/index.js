const userRouter = require('./user.route')
const productRouter = require('./product.route')

const initRoutes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)
}

module.exports = initRoutes