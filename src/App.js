import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
//import Product from './Pages/Product';
import SearchExercise from './Pages/SearchExercise';
import ExerciseDetail from './Pages/ExerciseDetail';
import Footer from './components/Footer';
import SignUpForm from './components/SignUpForm';
import SignIn from './components/SignIn';
import Dashboard from './Pages/Dashboard';
import Errorpage from './components/Errorpage';
import { Routes, Route } from 'react-router-dom';

import MaybeShowNavBar from './components/MaybeShowNavBar/MaybeShowNavBar';

const App = () => {
  return (
    <div>
      
      <MaybeShowNavBar>
        <Navbar />
      </MaybeShowNavBar>

     

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      {/* <Route path="/products" element={<Product />} />*/}
        <Route path="/search" element={<SearchExercise />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
