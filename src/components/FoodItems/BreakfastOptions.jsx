import React, { useState } from 'react';
import SearchBar from './SearchBar';
import './BreakfastOptions.css';

const BreakfastOptions = () => {
  const [selectedFood, setSelectedFood] = useState(null);
  const [nutrientDetails, setNutrientDetails] = useState(null);
  const [servingSize, setServingSize] = useState('');
  const [servingUnit, setServingUnit] = useState('');
  const apiKey = 'CqQKXGXopsLYib1nFgUTiqhWWVhvUC5clFg9AQiu'; // Your API key

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
    // Perform any necessary calculations if needed
  };

  const requiredNutrients = ['Protein', 'Carbohydrate, by difference', 'Total Sugars', 'Total lipid (fat)', 'Sodium, Na'];

  return (
    <div className="title-container">
      <h2>Breakfast Options</h2>
      <SearchBar onFoodSelect={handleFoodSelect} apiKey={apiKey} />
      {selectedFood && !servingSize && (
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
          {nutrientDetails.foodNutrients && nutrientDetails.foodNutrients.length > 0 ? (
            <ul>
              {nutrientDetails.foodNutrients.filter(nutrient => requiredNutrients.includes(nutrient.nutrient.name)).map((nutrient, index) => (
                <li key={index}>
                  {nutrient.nutrient.name}: {(nutrient.amount * (servingSize / 100)).toFixed(2)} {nutrient.nutrient.unitName}
                </li>
              ))}
            </ul>
          ) : (
            <p>No nutrient details available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BreakfastOptions;
