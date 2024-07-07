// Foods.jsx
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './Foods.css';
import Cards from '../Cards/Cards';
import BreakfastOptions from '../FoodItems/BreakfastOptions';
import LunchOptions from '../FoodItems/LunchOptions';
import DinnerOptions from '../FoodItems/DinnerOptions';
const Foods = () => {
  const navigate = useNavigate();

  const handleCardClick = (categoryTitle) => {
    navigate(categoryTitle.toLowerCase());
  };

  return (
    <div className='foods'>
      <Routes>
        <Route path="/" element={<Cards categoryType='food' onCardClick={handleCardClick} />} />
        <Route path="breakfast" element={<BreakfastOptions />} />
        {/* } />
        <Route path="snacks" element={<SnacksOptions />} />
        */}
        <Route path="lunch" element={<LunchOptions />} />
        <Route path="dinner" element={<DinnerOptions />} /> 

      </Routes>
    </div>
  );
};

export default Foods;
