import React, { useState } from 'react';
import { Box } from '@mui/material';
import Exercises from '../Exercises';
import SearchExercises from '../SearchExercises';
import HeroBanner from '../HeroBanner';

const Workouts = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');

  return (
    <Box
      ml="240px" /* Adjust margin-left to accommodate the sidebar width */
      sx={{
        flexGrow: 1, /* Allow the component to grow to fill available space */
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        minHeight: '100vh', /* Ensure component stretches to fill viewport height */
        overflow: 'auto', /* Enable scrolling if content overflows */
        padding: '20px' /* Adjust padding as necessary */
      }}
    >
      <HeroBanner />
      <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} />
      <Exercises setExercises={setExercises} exercises={exercises} bodyPart={bodyPart} />
    </Box>
  );
};

export default Workouts;
