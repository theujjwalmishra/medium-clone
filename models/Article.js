const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String
    },
    content: {
        type: String, 
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    tags: [{
        type: String
    }],
    category: {
        type: String,
        default: 'Technology'
    },
    status: {
        type: String,
        enum: ['Draft', 'Published'],
        default: 'Draft'
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [
        {
            text: String,
            postedBy: { type: String, default: "Anonymous" },
            createdAt: { type: Date, default: Date.now }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Article', ArticleSchema);