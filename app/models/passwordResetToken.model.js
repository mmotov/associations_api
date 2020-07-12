const mongoose = require('mongoose');

const PasswordResetTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
        expires: 43200 // after 12 hours token will be deleted automatically
    }
});

const PasswordResetToken = mongoose.model('password_reset_token', PasswordResetTokenSchema);

module.exports = PasswordResetToken;