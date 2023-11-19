const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true // bỏ dấu cách 
    },
    slug: {  // đồng hồ apple --> dong-ho-apple
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    description: {
        type: Array,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true

    },
    quantity: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    thumbnail: {
        type: String,
        required: true
    },
    images: {
        type: Array,
    },
    color: {
        type: String,
    },
    rating: [
        {
            star: { type: Number },
            postedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
            comment: { type: String }
        }
    ],
    totalRatings: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Product', productSchema);