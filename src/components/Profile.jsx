import React, { useState, useEffect } from 'react';
import './Profile.css';
import defaultModel from '../assets/images/user.png';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Dummy data for now; replace with actual data from the signup process
const goalWeight = 70; // User's goal weight in kg
const currentWeight = 90; // User's current weight in kg
const height = 175; // User's height in cm
const age = 30; // User's age, replace with actual age data
const gender = 'male'; // User's gender
const activityLevel = 1.55; // Moderate exercise

const data = [
  { day: 'Monday', burned: 500, gained: 300 },
  { day: 'Tuesday', burned: 500, gained: 1200 },
  { day: 'Wednesday', burned: 600, gained: 400 },
  { day: 'Thursday', burned: 800, gained: 600 },
  { day: 'Friday', burned: 550, gained: 450 },
  { day: 'Saturday', burned: 900, gained: 700 },
  { day: 'Sunday', burned: 650, gained: 500 },
];
/*
Sayad stored food data lai yo tarika le access garna milxa hola
useEffect(() => {
  const storedFoods = localStorage.getItem('selectedFoods');
  if (storedFoods) {
    const selectedFoods = JSON.parse(storedFoods);
    const requiredNutrients = ['Energy']; // Calories are usually represented by 'Energy'

    const totalCalories = selectedFoods.reduce((total, food) => {
      const nutrientDetail = food.nutrientDetails.foodNutrients.find(n => requiredNutrients.includes(n.nutrient.name));
      if (nutrientDetail) {
        let multiplier = 1;
        if (food.servingUnit.toLowerCase() === 'oz') {
          multiplier = 28.3495; // Convert ounces to grams
        } else if (food.servingUnit.toLowerCase() === 'g') {
          multiplier = 1; // Grams, already in grams
        }
        const calories = nutrientDetail.amount * (food.servingSize / multiplier);
        return total + calories;
      }
      return total;
    }, 0);

    // Update the data with the total calories gained
    const updatedData = data.map((entry, index) => ({
      ...entry,
      gained: totalCalories / data.length, // distribute the calories evenly for now
    }));

    setData(updatedData);
  }
}, []);*/

const calculateBMR = (weight, height, age, gender) => {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};


const Profile = () => {
  const [image, setImage] = useState(defaultModel);
  const [totalBurned, setTotalBurned] = useState(0);
  const [totalGained, setTotalGained] = useState(0);
  const [dailyCaloriesNeeded, setDailyCaloriesNeeded] = useState(0);
  const [daysToGoal, setDaysToGoal] = useState(0);

  useEffect(() => {
    const totalBurned = data.reduce((acc, cur) => acc + cur.burned, 0);
    const totalGained = data.reduce((acc, cur) => acc + cur.gained, 0);
    setTotalBurned(totalBurned);
    setTotalGained(totalGained);

    const dailyBMR = calculateBMR(currentWeight, height, age, gender);
    const dailyCalories = dailyBMR * activityLevel;
    setDailyCaloriesNeeded(dailyCalories);

    const dailyCaloricDeficit = dailyCalories - (totalGained / 7) + (totalBurned / 7);
    const caloriesToLose = (currentWeight - goalWeight) * 7700; // 7700 calories to lose 1 kg

    const daysToGoal = Math.round(caloriesToLose / dailyCaloricDeficit);
    setDaysToGoal(daysToGoal);
  }, []);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(event.target.files[0]);
    }
  };


  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="welcome-section">
        <input 
          type="file" 
          accept="image/*" 
          id="upload-image" 
          style={{ display: 'none' }} 
          onChange={handleImageChange} 
        />
        <label htmlFor="upload-image">
          <img src={image} alt="Profile" className="profile-pic" />
        </label>
        <div className="user-details">
          <div>
            <h2>Saroj Poudel</h2>
            <p>sarojpoudel077@example.com</p>
          </div>
          <div className="additional-details">
            <p>Age: {age}</p>
            <p>Current Weight: {currentWeight}</p>
            <p>Goal Weight: {goalWeight} kg</p>
          </div>
        </div>
      </div>

      <div className="history-section">
        <h2>Calories History</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="burned" stroke="#da1c5d" />
            <Line type="monotone" dataKey="gained" stroke="#1c5dda" />
          </LineChart>
        </ResponsiveContainer>
        
        <div className="totals-section">
        <div className="total-item">
            <h3>Daily Calories Needed</h3>
            <p>{dailyCaloriesNeeded.toFixed(2)} calories</p>
          </div>
          <div className="total-item">
            <h3>Total Calories Burned</h3>
            <p>{totalBurned} calories</p>
          </div>
          <div className="total-item">
            <h3>Total Calories Gained</h3>
            <p>{totalGained} calories</p>
          </div>
        </div>
      </div>

      
      <div className="goal-section">
        <h2>Goal Achievement</h2>
        <p>Based on your current progress, you can achieve your goals in <strong>{daysToGoal} days</strong>.</p>
      </div>
    </div>
  );
};


export default Profile;
