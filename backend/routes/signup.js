// routes/signup.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/signup
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
