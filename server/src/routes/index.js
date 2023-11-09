const userRouter = require('./user.route')

const initRoutes = (app) => {
    app.use('/api/user', userRouter)
}

module.exports = initRoutes