import React, { useState } from 'react'
import about from '../assets/images/about.png';
import './About.css'

const About = () => {

    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => {
        setExpanded(!expanded);
      };

  return (
    <div className="about-us-container">
         <div className="about-us-image">
            <img src={about} alt="About Us" />
        </div>
        <div className="about-us-description">
        <h2>About Us</h2>
                <p>
                    Welcome to <span className="brand"> FitPulse</span>—where fitness meets inspiration!
                </p>
                <p>
                    At FitPulse , we're passionate about empowering individuals to embrace a healthier lifestyle and achieve their fitness goals. 
                    We've created a supportive community and a comprehensive platform designed to guide and motivate you every step of the way.
                </p>
                <p>
                    Our mission is simple: to inspire and educate people of all fitness levels, from beginners to seasoned athletes, to lead healthier and happier lives. 
                    Whether you're looking to lose weight, build muscle, improve flexibility, or simply enhance your overall well-being, we have the tools, resources, and expert guidance to help you succeed.
                </p>

                {expanded && (<>
                <p>
                    From personalized workout plans and nutrition tips to insightful articles and engaging fitness challenges, we offer a diverse range of content to cater to your individual needs and preferences. 
                </p>
                <p>
                    Join our community today and embark on a transformative journey towards a fitter, stronger, and more vibrant you. Together, we'll celebrate your achievements, overcome obstacles, and embrace the joy of living a healthy lifestyle.
                </p> 
                <button className="button" onClick={toggleExpanded}>
                    Read Less
                </button>              
                </>)}

                {!expanded && (
                <button className="button" onClick={toggleExpanded}>
                    Read More
                </button>
                )}
        </div>
    </div>
  )
}

export default About
