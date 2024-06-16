import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import SearchBar from './SearchBar';
import './BreakfastOptions.css';

Chart.register(ArcElement, Tooltip, Legend);

const BreakfastOptions = () => {
  const [selectedFood, setSelectedFood] = useState(null);
  const [nutrientDetails, setNutrientDetails] = useState(null);
  const [servingSize, setServingSize] = useState('');
  const [servingUnit, setServingUnit] = useState('');
  const [chartData, setChartData] = useState(null); // Initialize chartData state

  const apiKey = 'CqQKXGXopsLYib1nFgUTiqhWWVhvUC5clFg9AQiu';

  const fetchNutrientDetails = async (fdcId) => {
    try {
      const response = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=${apiKey}`);
      const data = await response.json();
      setNutrientDetails(data);
    } catch (error) {
      console.error('Error fetching nutrient details:', error);
    }
  };

  const handleFoodSelect = (food) => {
    setSelectedFood(food);
    fetchNutrientDetails(food.fdcId);
    setServingSize('');
    setServingUnit('');
    setChartData(null); // Reset chartData when a new food is selected
  };

  const handleServingInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'servingSize') {
      setServingSize(value);
    } else if (name === 'servingUnit') {
      setServingUnit(value);
    }
  };

  const handleSubmitServing = (event) => {
    event.preventDefault();
    updateChartData();
  };

  const requiredNutrients = ['Protein', 'Carbohydrate, by difference', 'Total Sugars', 'Total lipid (fat)'];

  const updateChartData = () => {
    if (!nutrientDetails || !servingSize || !servingUnit) {
      setChartData(null); // Reset chartData if required data is missing
      return;
    }

    const updatedChartData = {
      labels: requiredNutrients,
      datasets: [
        {
          label: 'Nutrient Breakdown',
          data: requiredNutrients.map(nutrient => {
            const nutrientDetail = nutrientDetails.foodNutrients.find(n => n.nutrient.name === nutrient);
            if (!nutrientDetail) return 0;

            const multiplier = servingUnit.toLowerCase() === 'g' ? 1 : 28.3495; // assuming 1 oz = 28.3495 g
            const amountInGrams = nutrientDetail.amount * (servingSize / multiplier);
            return amountInGrams.toFixed(2);
          }),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#C70039'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#C70039'],
        },
      ],
    };

    setChartData(updatedChartData);
  };

  return (
    <div className="title-container">
      <h2>Breakfast Options</h2>
      <SearchBar onFoodSelect={handleFoodSelect} apiKey={apiKey} />
      {selectedFood && (
        <div className="serving-input">
          <h3>Enter serving size for {selectedFood.description}</h3>
          <form onSubmit={handleSubmitServing}>
            <input
              type="number"
              name="servingSize"
              placeholder="Serving size"
              value={servingSize}
              onChange={handleServingInputChange}
              required
            />
            <input
              type="text"
              name="servingUnit"
              placeholder="Serving unit (e.g., g, oz)"
              value={servingUnit}
              onChange={handleServingInputChange}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {selectedFood && nutrientDetails && servingSize && servingUnit && (
        <div className="nutrient-details">
          <h3>Nutrient Details for {selectedFood.description}</h3>
          {chartData ? (
            <div className="chart-container">
              <Pie data={chartData} />
            </div>
          ) : (
            <p>No nutrient details available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BreakfastOptions;
