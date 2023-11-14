const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
    },
    cart: [
        {
            product: { type: mongoose.Types.ObjectId, ref: 'Product' },
            quantity: Number,
            color: String,
        }
    ],
    address: {
        type: String,
    },
    wishlist: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
    isBlocked: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String,
    },
    passwordChangedAt: {
        type: String
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpire: {
        type: String
    }

}, {
    timestamps: true
});

// Hash password before save
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next()
    this.password = await bcrypt.hash(this.password, 12)
})

// Compare password
userSchema.methods = {
    comparePassword: async function (inputPassword) {
        return await bcrypt.compare(inputPassword, this.password)
    },

    createPasswordChangedToken: async function () {
        const resetToken = crypto.randomBytes(32).toString('hex')
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        this.passwordResetExpire = Date.now() + 15 * 60 * 60 * 1000
        return resetToken
    }
}
//Export the model
module.exports = mongoose.model('User', userSchema);