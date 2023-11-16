const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    brand: {
        type: Array,
        required: true
    }

}, { timestamps: true });

//Export the model
module.exports = mongoose.model('ProductCategory', productCategorySchema);