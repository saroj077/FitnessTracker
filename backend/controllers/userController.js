const DailyIntake = require('../models/food.model'); // Update the path as necessary

// module.exports.food = async(req, res) => {
//     try {
//         const { foodItems, userId } = req.body;

//         const today = new Date();
//         today.setHours(0, 0, 0, 0); // Reset time to start of the day

//         // Check if there's already an entry for today
//         let dailyIntake = await DailyIntake.findOne({ userId, date: today });

//         if (dailyIntake) {
//             // If an entry exists, update it
//             foodItems.forEach((item) => {
//                 dailyIntake.foodItems.push(item);
//                 dailyIntake.totalProtein += item.protein * item.serving;
//                 dailyIntake.totalCarbs += item.carbs * item.serving;
//                 dailyIntake.totalFats += item.fats * item.serving;
//             });
//         } else {
//             // If no entry exists, create a new one
//             dailyIntake = new DailyIntake({
//                 userId,
//                 date: today,
//                 foodItems: foodItems,
//                 totalProtein: foodItems.reduce((total, item) => total + item.protein * item.serving, 0),
//                 totalCarbs: foodItems.reduce((total, item) => total + item.carbs * item.serving, 0),
//                 totalFats: foodItems.reduce((total, item) => total + item.fats * item.serving, 0),
//             });
//         }

//         await dailyIntake.save();

//         // Respond with the updated or newly created daily intake
//         res.status(201).json(dailyIntake);
//     } catch (error) {
//         console.error('Error saving food:', error);
//         res.status(500).json({ message: 'Error saving food', error });
//     }
// }


// Adjust the path as needed

module.exports.food = async(req, res) => {
    try {
        const { foodItems, userId } = req.body;

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of the day

        let dailyIntake = await DailyIntake.findOne({ userId, date: today });

        if (dailyIntake) {
            // If an entry exists, update it
            foodItems.forEach((item) => {
                const calories = (item.protein * 4 + item.carbs * 4 + item.fats * 9) * item.serving;
                item.calories = calories; // Calculate and add calories

                dailyIntake.foodItems.push(item);
                dailyIntake.totalProtein += item.protein * item.serving;
                dailyIntake.totalCarbs += item.carbs * item.serving;
                dailyIntake.totalFats += item.fats * item.serving;
                dailyIntake.totalCalories += calories;
            });
        } else {
            // If no entry exists, create a new one
            const totalProtein = foodItems.reduce((total, item) => total + item.protein * item.serving, 0);
            const totalCarbs = foodItems.reduce((total, item) => total + item.carbs * item.serving, 0);
            const totalFats = foodItems.reduce((total, item) => total + item.fats * item.serving, 0);
            const totalCalories = foodItems.reduce((total, item) => {
                const calories = (item.protein * 4 + item.carbs * 4 + item.fats * 9) * item.serving;
                item.calories = calories; // Calculate and add calories
                return total + calories;
            }, 0);

            dailyIntake = new DailyIntake({
                userId,
                date: today,
                foodItems,
                totalProtein,
                totalCarbs,
                totalFats,
                totalCalories
            });
        }

        await dailyIntake.save();
        res.status(201).json(dailyIntake);
    } catch (error) {
        console.error('Error saving food:', error);
        res.status(500).json({ message: 'Error saving food', error });
    }
};