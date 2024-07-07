// models/Food.js

const mongoose = require('mongoose');

const FoodItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true },
    serving: { type: Number, required: true },
    calories: { type: Number, required: true }
});

const DailyIntakeSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    foodItems: { type: [FoodItemSchema], required: true },
    totalProtein: { type: Number, required: true },
    totalCarbs: { type: Number, required: true },
    totalFats: { type: Number, required: true },
    totalCalories: { type: Number, required: true }
});

module.exports = mongoose.model('DailyIntake', DailyIntakeSchema);