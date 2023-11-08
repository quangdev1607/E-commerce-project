//-----------------REQUIRE-----------------------

const express = require('express')
const app = express()
//-----------------DB-----------------------
const { connectDb } = require('./src/db/connect')
//-----------------GENERAL-----------------------
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//-----------------ROUTES-----------------------
app.use('/', (req, res) => {
    res.send('Hello')
})
//-----------------ERROR HANDLER-----------------------

//-----------------PORT-----------------------


const port = process.env.PORT || 3000
const start = async () => {
    try {
        connectDb(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()