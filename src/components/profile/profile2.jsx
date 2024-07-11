import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components'


const userId = '6687d4f95beb5f1d4d36d14c'; // Replace with actual userId

const CalorieChart = ({ intake, outtake, dates }) => {
  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Calorie Intake',
        data: intake,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Calorie Outtake',
        data: outtake,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      }
    ]
  };

  return (
    <div>
      <h2>Calorie Intake vs Outtake</h2>
      <Line data={chartData} />
    </div>
  );
};

const CalorieRecommendation = ({ intake, outtake }) => {
  const predictWeightChange = (intake, outtake) => {
    const calorieDeficit = intake - outtake;
    const weightChange = calorieDeficit / 7700; // 7700 calories roughly equal 1 kg of weight
    return weightChange;
  };

  const weightChange = predictWeightChange(intake, outtake);

  return (
    <div>
      {weightChange > 0 ? (
        <p>You are on track to gain {weightChange.toFixed(2)} kg per day.</p>
      ) : (
        <p>You are on track to lose {Math.abs(weightChange).toFixed(2)} kg per day.</p>
      )}
    </div>
  );
};

const Profile = () => {


  const date =  new Date()


    





  // const [totalCalories, setTotalCalories] = useState(null);
  // const [calorieOuttake, setCalorieOuttake] = useState(500);
  // const [calorieIntake, setCalorieIntake] = useState([]);
  // // const [outtake, setOuttake] = useState();
  // const outtake = 500
  // const [dates, setDates] = useState([]);
   

  // useEffect(() => {
  //   const fetchTotalOuttake = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/exercise/totalCalories', {
  //         params: { userId }
  //       });
  //       setCalorieOuttake(response.data.totalCalories);
  //     } catch (error) {
  //       console.error('Error fetching total outtake calories:', error);
  //     }
  //   };

  //   fetchTotalOuttake();
  // }, [userId]);


  const [totalCalories, setTotalCalories] = useState(null);
  const [calorieOuttake] = useState(500);

  //------------kasailai man lage garada hunxa yo

   const [calorieIntake, setCalorieIntake] = useState([]);
  const [outtake] = useState([]);
   const [dates] = useState([]);




  useEffect(() => {
      
      
    const fetchTotalCalories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/food/calories', {
                params: { userId, date }
            });
            setTotalCalories(response.data.totalCalories);
            setCalorieIntake()
        } catch (error) {
            console.error('Error fetching total calories:', error);
        }
    };

    fetchTotalCalories();
}, [userId, date]);

  return (

    <>
     
      <h1>Profile Page</h1>
  
        <Container>
        {totalCalories !== null ? (
          <p>Total Calories: {totalCalories}</p>
        ) : (
          <p>Loading...</p>
        )}
      
      <CalorieChart intake={calorieIntake} outtake={outtake} dates={dates} />
      <CalorieRecommendation intake={totalCalories} outtake={calorieOuttake} />


        </Container>
       
    
    </>
   
  );
};

export default Profile;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    border:solid black;
    margin-left: 300px;
`
