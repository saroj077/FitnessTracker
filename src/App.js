import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import SearchExercise from './Pages/SearchExercise';
import Footer from './components/Footer';


const App = () => {
  return (
    <div>
        <Navbar />
        <Home/>
        <About/>
        <SearchExercise/>
        <Footer/>

        {/*<Routes>
            <Route path= '/' element={<Home/>} />
            <Route path='about' element={<About/>} />
            <Route path='search' element={<SearchExercise/>} />
        </Routes>*/}

    </div>
  )
}

export default App
