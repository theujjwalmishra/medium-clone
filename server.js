const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

// Settings load karo
dotenv.config();

const app = express();

// Database se connect karo
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes connect karo
app.use('/api/auth', require('./routes/auth'));
app.use('/api/articles', require('./routes/articles'));

// Simple checking route
app.get('/', (req, res) => {
    res.send("🚀 Medium Clone Server is Running Successfully!");
});

// Port setting (Local ke liye 8000 set kiya fallback, deployment par automatic change ho jayega)
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`💻 Server running on port ${PORT}... Mazza aa gaya!`);
});