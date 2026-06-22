const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("🔥 MongoDB Connected Successfully! Database sahi chal raha hai.");
    } catch (err) {
        console.error("❌ Database connection failed:", err.message);
        process.exit(1); // Agar fail ho jaye toh process band kar do
    }
};

module.exports = connectDB;