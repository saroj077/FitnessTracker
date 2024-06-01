import React from 'react';
import './Foods.css';
import Cards from '../Cards/Cards';

const Foods = () => {
  return (
    <div className='foods'>
      <Cards categoryType='food' />
    </div>
  );
};

export default Foods;
