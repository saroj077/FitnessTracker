import React from 'react'
import './Navbar.css'
import Logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <section className='nav-wrapper'>
    <div className="flexCenter paddings innerWidth nav-container">
        <Link to="/" className="nav-link">
            <img src={Logo} alt='logo' width={100}/>
        </Link>
        <div className=' nav-menu'>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <div className='SignUpbutton'>
                <Link to="/signup" className="nav-link">Sign Up</Link>
            </div>
            <div className='button'>
                <Link to="/signin" className="nav-link">Sign In</Link>
            </div>
        </div>
    </div>
</section>
  )
}

export default Navbar