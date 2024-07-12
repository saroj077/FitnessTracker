// index.js
const cookieParser = require('cookie-parser');
const express = require('express');
const connectDB = require('./db.js');
const itemModel = require('./models/item.js');
const foodModel = require('./models/food.model.js')
const orderModel = require('./models/order.js'); // Add this line
const cors = require('cors');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer'); // Add this line
const jwt = require('jsonwebtoken');
const verifyJwt = require('./middlewares/auth.middleware.js');
const userRoutes = require('./routes/userRoutes.js')








const app = express();
app.use(express.json());
app.use(cors({

    // origin: 'http://localhost:3001',
    credentials: true,
}));
app.use(cookieParser());



app.use('/api', userRoutes)
app.use(cors());


connectDB(); // Ensure MongoDB connection
app.get('/', (req, res) => {
        res.send('Server is running');
    })
    // Transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fitpulse777@gmail.com',
        pass: 'FitP@l$e077'
    }
});

//generate token
const generateAccessToken = async(userId) => {
    try {
        const user = await itemModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const accessToken = user.generateAccessToken();
        console.log(accessToken);
        return accessToken;
    } catch (error) {
        throw new Error(error);
    }
};


// Route to handle signup requests
app.post('/signup', async(req, res) => {
    try {
        const {
            name,
            email,
            password,
            age,
            weight,
            height,
            goal
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newItem = new itemModel({
            name,
            email,
            password: hashedPassword,
            age,
            weight,

            height,

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
app.post('/signin', async(req, res) => {
    try {
        const { email } = req.body;

        const user = await itemModel.findOne({ email });
        console.log('login success')
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // const isMatch = await bcrypt.compare(password, user.password);

        // if (!isMatch) {
        //     return res.status(401).json({ success: false, message: "Invalid email or password" });
        // }
        // const accessToken = await generateAccessToken(user._id);
        // const loggedInUser = await itemModel.findById(user._id).select('-password');
        // const options = {
        //     httpOnly: true,
        //     secure: true,
        // }
        // return res
        //     .cookie('accessToken', accessToken, options)
        //     .status(200).json({ success: true, message: "Sign-in successful", username: loggedInUser, accessToken })


    } catch (error) {
        console.error("Error signing in:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// Route to handle placing orders
app.post('/api/orders/place', async(req, res) => {
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

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


app.post('/logout', verifyJwt, async(req, res) => {
        await itemModel.findByIdAndUpdate(
            req.user._id, {
                new: true,
            }
        )
        const options = {
            httpOnly: true,
            secure: true,
        }
        return res
            .clearCookie('accessToken', options)
            .status(200)
            .json({ success: true, message: "Sign-out successful" });
    }

);

// Route to handle fetching user details
app.get('/current-user', verifyJwt, async(req, res) => {
    res.status(200).json(req.user);
});