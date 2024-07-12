const DailyIntake = require('../models/food.model'); // Update the path as necessary
const itemModel = require('../models/item')
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


module.exports.getCal = async(req, res) => {
    const { userId, date } = req.query;
    try {
        const { userId, date } = req.query;

        const today = new Date(date);
        today.setHours(0, 0, 0, 0); // Reset time to start of the day

        const dailyIntake = await DailyIntake.findOne({ userId, date: today });

        if (dailyIntake) {
            res.status(200).json({ totalCalories: dailyIntake.totalCalories });
        } else {
            res.status(404).json({ message: 'No data found for today' });
        }
    } catch (error) {
        console.error('Error fetching total calories:', error);
        res.status(500).json({ message: 'Error fetching total calories', error });
    }


};

module.exports.getdata = async(req, res) => {
    try {
        const { email } = req.query; // assume email is passed as a query parameter
        const user = await itemModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json({
            // height: user.height,
            age: user.age,
            weight: user.weight,
            height: user.height,
            name: user.name
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

}