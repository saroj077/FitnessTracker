const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://saroj:test123@cluster0.jjn9ykw.mongodb.net/fitpulse?retryWrites=true&w=majority&appName=Cluster0');
        console.log(`MongoDB connected`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
