const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    viewCounts: {
        type: Number,
        default: 0
    },
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    disLikes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    image: {
        type: String,
        default: 'https://image8.uhdpaper.com/wallpaper-hd/nature-scenery-river-sunset-minimalist-digital-art-uhdpaper.com-hd-8.3219.jpg'
    },
    author: {
        type: String,
        default: 'Admin'
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true }, // Lưu giá trị tạo mới (không có trong schema) dưới dạng properties của document khi dùng res.json() trong controller (không được lưu vào db)
    toObject: { virtuals: true } // Lưu dưới dạng Object
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);