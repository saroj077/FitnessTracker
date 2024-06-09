import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import MainDash from '../components/MainDash/MainDash';
import Workouts from '../components/Workouts/Workouts';
import Commerce from '../components/Commerce/Commerce';
import Foods from '../components/Foods/Foods';
import BreakfastOptions from '../components/FoodItems/BreakfastOptions';
import LunchOptions from '../components/FoodItems/LunchOptions';
import SnacksOptions from '../components/FoodItems/SnacksOptions';
import DinnerOptions from '../components/FoodItems/DinnerOptions';
import Cart from '../components/Commerce/Cart';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <Sidebar />
      <div className='main-content'>
        <Routes>
          <Route path="/" element={<MainDash />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/commerce" element={<Commerce />} />
          <Route path="/commerce/cart" element={<Cart />} /> {/* Add route for Cart */}
          <Route path="/foods/*" element={<Foods />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
