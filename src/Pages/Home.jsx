import React from 'react'
import './Home.css'
import { FaSearch } from "react-icons/fa";
import CountUp from 'react-countup';
import Model from '../assets/images/Model.png';


const Home = () => {
  return (
    <section className='home-wrapper'>
      <div className='paddings flexCenter innerWidth home-container'>

        <div className='flexColStart home-left'>
          <div className='home-title'>
            <h1>Fitness Tracker <br/>Track. Achieve. Conquer.</h1>
          </div>

          <div className='flexColStart home-des'>
            <span>Start tracking today </span>
            <span>unlock your full potential </span>
            <span>with <span>FitPulse</span></span>
          </div>

          <div className='flexCenter search-bar'>
            <FaSearch color='#da1c5d' size={20} />
            <input type='text' placeholder='Search Exercises'/>
            <button className='button'>Search</button>
          </div>

         <div className='flexCenter stats'>
            <div className='flexColCenter stat'>
              <span><CountUp start={1000} end={2000}/>
              <span>+</span>
              </span>
              <span className='span-detail'>Fitness Product</span>
            </div>

            <div className='flexColCenter stat'>
              <span><CountUp start={0} end={200}/>
              <span>+</span>
              </span>
              <span className='span-detail'>Total User Registered</span>
            </div>

            <div className='flexColCenter stat'>
              <span><CountUp end={50}/>
              <span>+</span>
              </span>
              <span className='span-detail'>Daily Active User</span>
            </div>
          </div> 

        </div>

        <div className='flexCenter right-side'>
          <div className='image-container'>
              <img src={Model} alt=''/>
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default Home
