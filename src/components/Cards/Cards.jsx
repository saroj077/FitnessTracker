import React from 'react';
import './Cards.css';
import { WorkoutCategories, FoodCategories } from '../../Data/data';

const Cards = ({ categoryType }) => {
  const categories = categoryType === 'food' ? FoodCategories : WorkoutCategories;
  
  return (
    <section>
      <h1>{categoryType === 'food' ? 'Food Categories' : 'Workout Categories'}</h1>
      <div className='cards-container'>
        <div className='cards'>
          {categories.map((category, index) => (
            <div key={index} className='card-container'>
              <div className='card' style={{ borderColor: category.borderColor }}>
                <img src={category.image} alt={category.title} />
              </div>
              <div className='card-title'>{category.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cards;
