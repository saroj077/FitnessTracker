import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import MainDash from '../components/MainDash/MainDash';
import Workouts from '../components/Workouts/Workouts';
import Foods from '../components/Foods/Foods';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <Sidebar />
      <div className='main-content'>
        <Routes>
          <Route path="/" element={<MainDash />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/foods" element={<Foods />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
