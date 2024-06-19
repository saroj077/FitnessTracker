const jwt = require('jsonwebtoken');
const itemModel = require('../models/item.js');
const dotenv = require('dotenv').config();

const verifyJwt = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await itemModel.findById(decodedToken?._id).select('-password');
        if (!user) {
            return res.status(401).json({ error: "Unauthorized: User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
};

module.exports = verifyJwt;
