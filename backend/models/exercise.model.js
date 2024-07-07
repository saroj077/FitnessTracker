const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({


    name: { type: String, required: true },
    weight: { type: Number, required: true },
    rep: { type: Number, required: true },



}
    ,
    {
        timestamps: true,
    });

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;