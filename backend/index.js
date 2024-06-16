// index.js
const express = require('express');
const connectDB = require('./db.js');
const itemModel = require('./models/item.js');
const orderModel = require('./models/order.js'); // Add this line
const cors = require('cors');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer'); // Add this line

const app = express();
app.use(express.json());
app.use(cors());
connectDB(); // Ensure MongoDB connection

// Transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fitpulse777@gmail.com',
        pass: 'FitP@l$e077'
    }
});

// Route to handle signup requests
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password, weight, age, goal } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newItem = new itemModel({
            name,
            email,
            password: hashedPassword,
            weight,
            age,
            goal
        });

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

        const user = await itemModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        return res.status(200).json({ success: true, message: "Sign-in successful", username: user.name });
    } catch (error) {
        console.error("Error signing in:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// Route to handle placing orders
app.post('/api/orders/place', async (req, res) => {
    try {
        const { userId, cart, shippingDetails } = req.body;

        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

        const newOrder = new orderModel({
            userId,
            items: cart,
            totalPrice,
            shippingDetails
        });

        const savedOrder = await newOrder.save();

        // Fetch user details for sending email
        const user = await itemModel.findById(userId);

        // Send confirmation email
        const mailOptions = {
            from: 'fitpulse777@gmail.com',
            to: user.email,
            subject: 'Order Confirmation',
            text: `Dear ${user.name},\n\nYour order has been placed successfully.\n\nOrder Details:\n${JSON.stringify(cart, null, 2)}\n\nTotal Price: $${totalPrice.toFixed(2)}\n\nThank you for shopping with us!\n\nBest Regards,\nFitPulse Team`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Order placed successfully", orderId: savedOrder._id });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(3000, () => {
    console.log("Server is running");
});
