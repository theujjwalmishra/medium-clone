const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Endpoint: POST /api/auth/register (Naya Account Banane Ke Liye) [cite: 155]
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Check karo user pehle se register toh nahi hai
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User pehle se exist karta hai!" });
        }

        // 2. Naya user create karo
        user = new User({ name, email, password });

        // 3. Password ko hash (encrypt) karo taaki hacker bhi na padh sake
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // 4. Database me save karo
        await user.save();

        // 5. JWT token generate karo taaki user automatic login ho jaye [cite: 159]
        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'secretkey123', { expiresIn: '7d' });

        res.status(201).json({ token, message: "Mubarak ho! User register ho gaya." });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server me kuch gaddbad hai.");
    }
});
// Endpoint: POST /api/auth/login (Login Karne Ke Liye) [cite: 156]
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check karo ki user exists karta hai ya nahi
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Galat Email ya Password!" });
        }

        // 2. Password match karke dekho
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Galat Email ya Password!" });
        }

        // 3. Agar sab sahi hai toh naya JWT token generate karo [cite: 159]
        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'secretkey123', { expiresIn: '7d' });

        res.json({ token, message: "Mazza aa gaya! Login successful." });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server me gaddbad hai.");
    }
});
module.exports = router;