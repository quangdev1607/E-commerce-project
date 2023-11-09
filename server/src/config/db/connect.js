const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        if (conn.connection.readyState === 1) console.log('Database connected')
        else console.log('Database connecting...')
    } catch (error) {
        console.log("Database connection failed")
        throw new Error(error)
    }
}

module.exports = connectDb