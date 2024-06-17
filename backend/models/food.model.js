const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({


    name: { type: String, required: true },

    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true },

    serving: { type: Number, required: true },

},
    {
        timestamps: true,

    });

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;