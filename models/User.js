const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ek email se do account nahi ban sakte
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        sparse: true // Isse abhi empty username par error nahi aayega [cite: 163]
    },
    role: {
        type: String,
        enum: ['Reader', 'Writer', 'Admin'], // Yeh user roles hain [cite: 122]
        default: 'Reader' // Naya user by default Reader hoga [cite: 123]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);