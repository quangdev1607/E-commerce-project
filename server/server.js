//-----------------REQUIRE-----------------------
require('express-async-errors')


const express = require('express')
const app = express()
const initRoutes = require('./src/routes')


// const notFoundMiddleWare = require('./src/middlewares/notFoundMiddleware')
const { errorHandlerMiddleware, notFoundError } = require('./src/middlewares/errorHandlerMiddleware')
//-----------------DB-----------------------

const connectDb = require('./src/config/db/connect')

//-----------------GENERAL-----------------------

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//-----------------ROUTES-----------------------

initRoutes(app)

//-----------------ERROR HANDLER-----------------------

app.use(notFoundError)
app.use(errorHandlerMiddleware)

//-----------------PORT-----------------------

const port = process.env.PORT || 3000
const start = async () => {
    try {
        connectDb()
        app.listen(port, () => {
            console.log(`Listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()