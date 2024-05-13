import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Product from './Pages/Product';
import SearchExercise from './Pages/SearchExercise';
import Footer from './components/Footer';
import SignUpForm from './components/SignUpForm';
import SignIn from './components/SignIn';
import Errorpage from './components/Errorpage';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route



const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/search" element={<SearchExercise />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;