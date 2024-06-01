import React from 'react';
import './Workouts.css';
import Cards from '../Cards/Cards';

const Workouts = () => {
  return (
    <div className='workouts'>
      <Cards categoryType='workout' />
    </div>
  );
};

export default Workouts;
