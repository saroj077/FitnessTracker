import React, { useState, useEffect } from 'react';
import './profile.css';
import defaultModel from '../../assets/images/user.png';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import Profile2 from './profile2';
// Dummy data for now; replace with actual data from the signup process
// const goalWeight = 70; // User's goal weight in kg
// const currentWeight = 90; // User's current weight in kg
// const height = 175; // User's height in cm
// const age = 30; // User's age, replace with actual age data
// const gender = 'male'; // User's gender
// const activityLevel = 1.55; // Moderate exercise

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
  const userId = '66901dc328a12d9a3ade0de5'
  //const userId = '66909b3e720ba7ecd323cbd5'
  const date = new Date()


  const email = 'Ann1@gmail.com';
  // const email = "Ram@gmail.com"
  const [image, setImage] = useState(defaultModel);
  const [totalBurned, setTotalBurned] = useState(0);
  const [totalGained, setTotalGained] = useState(0);
  const [dailyCaloriesNeeded, setDailyCaloriesNeeded] = useState(0);
  const [daysToGoal, setDaysToGoal] = useState(0);


  const [height, setHeight] = useState(0);
  const [age, setAge] = useState(0);

  const [currentWeight, setCurrentWeight] = useState(0);
  const [goalWeight, setGoalWeight] = useState('');
  const [gender, setGender] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [name, setName] = useState('')
  const [duration, setDuration] = useState(0);
  //   useEffect(() => {
  //     const totalBurned = data.reduce((acc, cur) => acc + cur.burned, 0);
  //     const totalGained = data.reduce((acc, cur) => acc + cur.gained, 0);
  //     setTotalBurned(totalBurned);
  //     setTotalGained(totalGained);

  //     const dailyBMR = calculateBMR(currentWeight, height, age, gender);
  //     const dailyCalories = dailyBMR * activityLevel;
  //     setDailyCaloriesNeeded(dailyCalories);

  //     const dailyCaloricDeficit = dailyCalories - (totalGained / 7) + (totalBurned / 7);
  //     const caloriesToLose = (currentWeight - goalWeight) * 7700; // 7700 calories to lose 1 kg

  //     const daysToGoal = Math.round(caloriesToLose / dailyCaloricDeficit);
  //     setDaysToGoal(daysToGoal);
  //   }, []);

  useEffect(() => {
    if (currentWeight && height && age && gender && activityLevel && goalWeight) {
      const calculateBMR = (weight, height, age, gender) => {
        if (gender === 'male') {
          return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
        } else {
          return 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age;
        }
      };

      const dailyBMR = calculateBMR(currentWeight, height, age, gender);
      const dailyCalories = dailyBMR * activityLevel;
      setDailyCaloriesNeeded(dailyCalories);

      const dailyCaloricDeficit = dailyCalories - (totalGained / 7) + (totalBurned / 7);
      const caloriesToLose = (currentWeight - goalWeight) * 7700; // 7700 calories to lose 1 kg

      const daysToGoal = Math.round(caloriesToLose / dailyCaloricDeficit);
      setDaysToGoal(daysToGoal);
    }
  }, [currentWeight, height, age, gender, activityLevel, goalWeight, totalGained, totalBurned]);



  useEffect(() => {


    const fetchTotalCalories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/food/calories', {
          params: { userId, date }
        });
        setTotalGained(response.data.totalCalories);

      } catch (error) {
        console.error('Error fetching total calories:', error);
      }
    };

    fetchTotalCalories();
  }, [userId, date]);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleGoalWeightChange = (e) => setGoalWeight(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value);
  const handleActivityLevelChange = (e) => setActivityLevel(e.target.value);

  useEffect(() => {
    const fetchData = async () => {
      const email = 'Ann1@gmail.com'; // Replace with the actual email or fetch from context/auth state
      try {
        const response = await axios.get('http://localhost:5000/api/profile/data', {
          params: { email }
        });
        const { age, weight, height, name } = response.data;
        setAge(age);
        setCurrentWeight(weight);
        setHeight(height)
        setName(name)
        // Set other states as needed
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const fetchPredictedCalories = async () => {
    try {
      const response = await axios.post('http://localhost:8000/predict', {
        Gender: gender === 'male' ? 1 : 0,
        Age: age,
        Height: height,

        weight: currentWeight,
        Duration: duration,
        Heart_Rate: 100,
        Body_Temp: 37
      });

      setTotalBurned(response.data.prediction);
    }
    catch (error) {
      console.error('Error fetching predicted calories:', error);

    }

  }



  useEffect(() => {
    if (height && age && gender && currentWeight) {
      fetchPredictedCalories();
    }
  })


  const handleTotalBurnedChange = (event) => {
    setTotalBurned(event.target.value);
  };
  return (
    <div className="profile-container" style={{ marginLeft: '300px' }}>
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
            <h2>{name}</h2>
            <p>{email}</p>
            <p>Height: {height} cm</p>
            <p>Age: {age}</p>
            <p>Current Weight: {currentWeight} kg</p>
          </div>
          <div className="additional-details">
            <label>
              Goal Weight:
              <input
                type="number"
                value={goalWeight}
                onChange={handleGoalWeightChange}
              />
            </label>
            <label>
              Gender:
              <select value={gender} onChange={handleGenderChange}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <label>
              Activity Level:
              <select value={activityLevel} onChange={handleActivityLevelChange}>
                <option value="">Select</option>
                <option value="1.2">Sedentary (little or no exercise)</option>
                <option value="1.375">Lightly active (light exercise/sports 1-3 days/week)</option>
                <option value="1.55">Moderately active (moderate exercise/sports 3-5 days/week)</option>
                <option value="1.725">Very active (hard exercise/sports 6-7 days a week)</option>
                <option value="1.9">Super active (very hard exercise/sports & a physical job)</option>
              </select>
            </label>


          </div>
        </div>
      </div>

      <div className='duration'>
        <label htmlFor='duration'>Duration:</label>
        <input
          type='number'
          id='duration'
          name='duration'
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder='Enter duration in minutes'
        />
      </div>

      <div className="history-section">
        <div className='total-burned-input'>
          <label htmlFor='totalBurned'>Total Calories Burned:</label>
          <input
            type='number'
            id='totalBurned'
            name='totalBurned'
            value={totalBurned}
            onChange={handleTotalBurnedChange}
            placeholder='Enter total calories burned'
            disabled
          />
        </div>

        {/* <h2>Calories History</h2>
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
        </ResponsiveContainer> */}

        <div className="totals-section">
          <div className="total-item">
            <h3>Daily Calories Needed</h3>
            <p>{dailyCaloriesNeeded.toFixed(2)} calories</p>
          </div>
          <div className="total-item">
            <h3>Total Calories Burned</h3>
            <p>{totalBurned + 1800} calories</p>
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
        <p>note : for weight gain, -ve is shown </p>

      </div>
      <Profile2 outtake={totalBurned} />
    </div>

  );
};


export default Profile;
