const express = require('express');
const connectDB = require('./db.js'); // Import the 'connectDB' function
const itemModel = require('./models/item.js');
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(cors())
connectDB(); // Call the 'connectDB' function

// Route to handle signup requests
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password, weight, age, goal } = req.body;

        // Create a new item document
        const newItem = new itemModel({
            name,
            email,
            password,
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
/*app.post('/signin', async (req, res) => {
    try {
        const { email, pw } = req.body;

        // Find user by email and password
        const user = await itemModel.findOne({ email, pw });

        if (!user) {
            // If user not found or password is incorrect, send error response
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // If user found and password is correct, send success response
        return res.status(200).json({ success: true, message: "Sign-in successful", username: user.name });
    } catch (error) {
        console.error("Error signing in:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});*/

app.listen(3000, () => {
    console.log("Server is running");
});
