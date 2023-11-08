const mongoose = require('mongoose')

module.exports.connectDb = (uri) => {
    mongoose.connect(uri)
    mongoose.connection.on('error', console.error)
    mongoose.connection.once('open', () => console.log('Database Connected'))
}