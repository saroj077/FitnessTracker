const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    weight: { type: Number, required: true },
    age: { type: Number, required: true },
    goal: { type: String, required: true }
});

itemSchema.methods.generateAccessToken = function () {
    return (jwt.sign(
        {
            _id: this._id,
            email: this.email,

            name: this.name
        },
        process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
    )

}


const itemModel = mongoose.model('Item', itemSchema);

module.exports = itemModel;
