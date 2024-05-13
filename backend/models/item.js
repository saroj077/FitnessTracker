const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    weight: { type: Number },
    age: { type: Number },
    goal: { type: String }
});

const itemModel = mongoose.model('Item', itemSchema);
module.exports = itemModel;