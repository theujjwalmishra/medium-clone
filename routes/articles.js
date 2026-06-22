const express = require('express');
const router = express.Router();
const Article = require('../models/Article'); // Sahi model folder se imported

// 1. FETCH ALL ARTICLES (GET)
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find().sort({ createdAt: -1 });
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: "Articles fetch karne me dikkat hui", error: err.message });
    }
});

// 2. CREATE NEW ARTICLE (POST)
router.post('/', async (req, res) => {
    const { title, subtitle, content, authorId, category, status } = req.body;
    try {
        const newArticle = new Article({
            title,
            subtitle,
            content,
            author: authorId, // Frontend se aane wali ID
            category,
            status
        });
        const savedArticle = await newArticle.save();
        res.status(201).json(savedArticle);
    } catch (err) {
        res.status(400).json({ message: "Article save nahi ho paya", error: err.message });
    }
});

// 3. LIKE ARTICLE (PUT)
router.put('/:id/like', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ message: "Article nahi mila bhei" });
        
        article.likes += 1;
        await article.save();
        res.json({ likes: article.likes });
    } catch (err) {
        res.status(500).json({ message: "Like karne me error", error: err.message });
    }
});

// 4. COMMENT ON ARTICLE (POST)
router.post('/:id/comment', async (req, res) => {
    const { text, postedBy } = req.body;
    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ message: "Article nahi mila bhei" });

        article.comments.push({ text, postedBy });
        await article.save();
        res.json(article.comments);
    } catch (err) {
        res.status(500).json({ message: "Comment add karne me error", error: err.message });
    }
});

module.exports = router;