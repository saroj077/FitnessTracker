import React from 'react'
import './Navbar.css'
import Logo from '../assets/images/logo.png';

const Navbar = () => {
  return (
    <section className='nav-wrapper'>
      <div className="flexCenter paddings innerWidth nav-container">
        <img src={Logo} alt='logo' width={100}/>
      <div className='flexCenter nav-menu'>
        <a href="">Home</a>
        <a href="">About</a>
        <a href="">Products</a>
        <a href="">Services</a>
        <a href="">Contact</a>
        <button className='SignUpbutton'>
          <a href="">SignUp</a>
        </button>
        <button className='button'>
          <a href="">SignIN</a>
        </button>
      </div>
    </div>
    </section>
  )
}

export default Navbar
