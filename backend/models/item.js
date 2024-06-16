const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    weight: { type: Number, required: true },
    age: { type: Number, required: true },
    goal: { type: String, required: true }
});

const itemModel = mongoose.model('Item', itemSchema);

module.exports = itemModel;
