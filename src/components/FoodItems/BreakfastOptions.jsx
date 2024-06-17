import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import SearchBar from './SearchBar';
import './BreakfastOptions.css';

Chart.register(ArcElement, Tooltip, Legend);

const BreakfastOptions = () => {
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [chartData, setChartData] = useState(null);

  const apiKey = 'CqQKXGXopsLYib1nFgUTiqhWWVhvUC5clFg9AQiu';

  const fetchNutrientDetails = async (fdcId) => {
    try {
      const response = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=${apiKey}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching nutrient details:', error);
      return null;
    }
  };

  const handleFoodSelect = async (food) => {
    const nutrientDetails = await fetchNutrientDetails(food.fdcId);
    if (nutrientDetails) {
      const newFood = {
        food,
        nutrientDetails,
        servingSize: '',
        servingUnit: '',
      };
      setSelectedFoods([...selectedFoods, newFood]);
      setChartData(null);
    }
  };

  const handleServingInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedFoods = [...selectedFoods];
    updatedFoods[index][name] = value;
    setSelectedFoods(updatedFoods);
  };

  const handleSubmitServing = (event) => {
    event.preventDefault();
    updateChartData();
  };

  const requiredNutrients = ['Protein', 'Carbohydrate, by difference', 'Total Sugars', 'Total lipid (fat)'];

  const calculateTotalMacro = () => {
    const totalMacro = {
      'Protein': 0,
      'Carbohydrate, by difference': 0,
      'Total Sugars': 0,
      'Total lipid (fat)': 0,
    };

    selectedFoods.forEach((selectedFood) => {
      requiredNutrients.forEach((nutrient) => {
        const nutrientDetail = selectedFood.nutrientDetails.foodNutrients.find((n) => n.nutrient.name === nutrient);
        if (nutrientDetail) {
          let multiplier = 1;
          if (selectedFood.servingUnit.toLowerCase() === 'oz') {
            multiplier = 28.3495; // Convert ounces to grams
          } else if (selectedFood.servingUnit.toLowerCase() === 'g') {
            multiplier = 1; // Grams, already in grams
          } else {
            multiplier = 1; // Default to grams for other units
          }
          const amountInGrams = nutrientDetail.amount * (selectedFood.servingSize / multiplier);
          totalMacro[nutrient] += amountInGrams;
        }
      });
    });

    return totalMacro;
  };

  const updateChartData = () => {
    const totalMacro = calculateTotalMacro();

    const updatedChartData = {
      labels: Object.keys(totalMacro),
      datasets: [
        {
          label: 'Total Macronutrients',
          data: Object.values(totalMacro).map((value) => value.toFixed(2)),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733'],
        },
      ],
    };

    setChartData(updatedChartData);
  };

  return (
    <div className='breakfast-options'>
      <h2 className='section-title'>Breakfast Options</h2>
      <SearchBar onFoodSelect={handleFoodSelect} apiKey={apiKey} />
      {selectedFoods.length > 0 && (
        <div className='serving-input'>
          {selectedFoods.map((selectedFood, index) => (
            <div key={index} className='food-item'>
              <h3 className='food-title'>Enter serving size for {selectedFood.food.description}</h3>
              <form onSubmit={handleSubmitServing}>
                <input
                  type='number'
                  name='servingSize'
                  placeholder='Serving size'
                  value={selectedFood.servingSize}
                  onChange={(event) => handleServingInputChange(event, index)}
                  required
                />
                <input
                  type='text'
                  name='servingUnit'
                  placeholder='Serving unit (e.g., g, oz)'
                  value={selectedFood.servingUnit}
                  onChange={(event) => handleServingInputChange(event, index)}
                  required
                />
              </form>
            </div>
          ))}
          <button className='submit-button' onClick={handleSubmitServing}>Update Chart</button>
        </div>
      )}
      <div className='data-table-container'>
        <h3 className='table-title'>Individual Food Item Macros</h3>
        <div className='data-table'>
          <table>
            <thead>
              <tr>
                <th>Food Item</th>
                {requiredNutrients.map((nutrient) => (
                  <th key={nutrient}>{nutrient}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectedFoods.map((selectedFood, index) => (
                <tr key={index}>
                  <td>{selectedFood.food.description}</td>
                  {requiredNutrients.map((nutrient) => {
                    const nutrientDetail = selectedFood.nutrientDetails.foodNutrients.find((n) => n.nutrient.name === nutrient);
                    if (nutrientDetail) {
                      let multiplier = 1;
                      if (selectedFood.servingUnit.toLowerCase() === 'oz') {
                        multiplier = 28.3495; // Convert ounces to grams
                      } else if (selectedFood.servingUnit.toLowerCase() === 'g') {
                        multiplier = 1; // Grams, already in grams
                      } else {
                        multiplier = 1; // Default to grams for other units
                      }
                      const amountInGrams = nutrientDetail.amount * (selectedFood.servingSize / multiplier);
                      return <td key={nutrient}>{amountInGrams.toFixed(2)}</td>;
                    }
                    return <td key={nutrient}>-</td>;
                  })}
                </tr>
              ))}
              <tr className='total-row'>
                <td>Total</td>
                {requiredNutrients.map((nutrient) => (
                  <td key={nutrient}>
                    {selectedFoods.reduce((total, selectedFood) => {
                      const nutrientDetail = selectedFood.nutrientDetails.foodNutrients.find((n) => n.nutrient.name === nutrient);
                      if (nutrientDetail) {
                        let multiplier = 1;
                        if (selectedFood.servingUnit.toLowerCase() === 'oz') {
                          multiplier = 28.3495; // Convert ounces to grams
                        } else if (selectedFood.servingUnit.toLowerCase() === 'g') {
                          multiplier = 1; // Grams, already in grams
                        } else {
                          multiplier = 1; // Default to grams for other units
                        }
                        const amountInGrams = nutrientDetail.amount * (selectedFood.servingSize / multiplier);
                        return total + amountInGrams;
                      }
                      return total;
                    }, 0).toFixed(2)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {chartData && (
        <div className='chart-container'>
          <h3 className='chart-title'>Total Macronutrients</h3>
          <Pie data={chartData} />
        </div>
      )}
    </div>
  );
};

export default BreakfastOptions;
