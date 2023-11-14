const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const orderSchema = new mongoose.Schema({
    products: [
        {
            product: { type: mongoose.Types.ObjectId, ref: 'Product' },
            amount: Number,
            color: String
        }
    ],
    status: {
        type: String,
        default: 'Processing',
        enum: ['Canceled', 'Processing', 'Succeed']
    },
    total: { type: Number },
    coupon: {
        type: mongoose.Types.ObjectId,
        ref: 'Coupon'
    },
    orderedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);