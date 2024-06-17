import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import "./MainDash.css";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MainDash = () => {
  // Initialize state with exercises fetched from localStorage or an empty array
  const [exercises, setExercises] = useState(() => {
    const storedExercises = localStorage.getItem('exercises');
    return storedExercises ? JSON.parse(storedExercises) : [];
  });
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');

  useEffect(() => {
    // Save exercises to localStorage whenever it changes
    localStorage.setItem('exercises', JSON.stringify(exercises));
  }, [exercises]);

  const handleAddExercise = () => {
    const newExercise = { name, weight: Number(weight), reps: Number(reps), date: new Date().toISOString() };
    setExercises([...exercises, newExercise]);
    setName('');
    setWeight('');
    setReps('');
  };

  const getChartData = (exerciseName) => {
    const filteredExercises = exercises.filter(ex => ex.name === exerciseName);
    const labels = filteredExercises.map(ex => {
      // Parse date string back to Date object
      const date = new Date(ex.date);
      return date.toLocaleDateString();
    });
    const data = filteredExercises.map(ex => ex.weight);

    return {
      labels,
      datasets: [{
        label: `${exerciseName} Weight Progression`,
        data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      }]
    };
  };

  const exerciseTypes = [...new Set(exercises.map(ex => ex.name))];

  return (
    <div className='Maindash'>
      <h1>Dashboard</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Exercise Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          type="number"
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
        <button onClick={handleAddExercise}>Add Exercise</button>
      </div>
      <div className="exercise-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Exercise</th>
              <th>Weight</th>
              <th>Reps</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise, index) => (
              <tr key={index}>
                <td>{new Date(exercise.date).toLocaleDateString()}</td>
                <td>{exercise.name}</td>
                <td>{exercise.weight}</td>
                <td>{exercise.reps}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="charts">
        {exerciseTypes.map((exerciseName, index) => (
          <div key={index} className="chart">
            <h2>{exerciseName} Progression</h2>
            <Line data={getChartData(exerciseName)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainDash;
