const express = require('express');
const connectDB = require('./db.js');
const itemModel = require('./models/item.js');
const cors = require('cors');
const bcrypt = require('bcryptjs'); 

const app = express();
app.use(express.json());
app.use(cors());
connectDB(); 

// Route to handle signup requests
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password, weight, age, goal } = req.body;

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new item document
        const newItem = new itemModel({
            name,
            email,
            password: hashedPassword,
            weight,
            age,
            goal
        });

        // Save the new item to the database
        await newItem.save();

        res.status(200).json({ message: "User signed up successfully" });
    } catch (error) {
        console.error("Error signing up:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to handle sign-in requests
app.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await itemModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // If user found and password is correct, send success response
        return res.status(200).json({ success: true, message: "Sign-in successful", username: user.name });
    } catch (error) {
        console.error("Error signing in:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

app.listen(3000, () => {
    console.log("Server is running");
});
