// import React from 'react'
// import './Navbar.css'
// import Logo from '../assets/images/logo.png';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <section className='nav-wrapper'>
//     <div className="flexCenter paddings innerWidth nav-container">
//         <Link to="/" className="nav-link">
//             <img src={Logo} alt='logo' width={100}/>
//         </Link>
//         <div className=' nav-menu'>
//             <Link to="/" className="nav-link">Home</Link>
//             <Link to="/about" className="nav-link">About</Link>
//             <Link to="/services" className="nav-link">Services</Link>
//             <Link to="/contact" className="nav-link">Contact</Link>
//             <div className='SignUpbutton'>
//                 <Link to="/signup" className="nav-link">Sign Up</Link>
//             </div>
//             <div className='button'>
//                 <Link to="/signin" className="nav-link">Sign In</Link>
//             </div>
//         </div>
//     </div>
// </section>
//   )
// }

// export default Navbar


import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/logo.png';// Replace with the actual path to your logo

const NavbarWrapper = styled.section`
  background-color: #fff; 
  height:20vh; /* Set your background color */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);  /* Optional shadow */
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px; /* Adjust the width */
  margin: 0 auto;
  padding: 0 20px;  /* Adjust the padding */
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer; /* Ensure the cursor changes to a pointer on hover */
`;

const NavMenu = styled.div`
  display: flex;
  gap: 20px; /* Adjust spacing between links */
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333; /* Adjust text color */
  font-size: 16px; /* Adjust font size */
  font-weight: 500; /* Adjust font weight */

  &:hover {
    color: #007bff; /* Change color on hover */
  }
`;

const SignUpButton = styled(Link)`
  background-color: #007bff; /* Background color */
  color: #fff; /* Text color */
  padding: 10px 20px; /* Padding */
  border-radius: 5px; /* Rounded corners */
  text-decoration: none; /* Remove underline */
  font-weight: 500; /* Font weight */
  cursor: pointer; /* Pointer cursor */

  &:hover {
    background-color: #0056b3; /* Darker background color on hover */
  }
`;

const SignInButton = styled(Link)`
  background-color: #6c757d; /* Background color */
  color: #fff; /* Text color */
  padding: 10px 20px; /* Padding */
  border-radius: 5px; /* Rounded corners */
  text-decoration: none; /* Remove underline */
  font-weight: 500; /* Font weight */
  cursor: pointer; /* Pointer cursor */

  &:hover {
    background-color: #5a6268; /* Darker background color on hover */
  }
`;

const Navbar = () => {
  return (
    <NavbarWrapper>
      <NavContainer>
        <LogoLink to="/">
          <img src={Logo} alt='logo' width={100} />
        </LogoLink>
        <NavMenu>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <SignUpButton to="/signup">Sign Up</SignUpButton>
          <SignInButton to="/signin">Sign In</SignInButton>
        </NavMenu>
      </NavContainer>
    </NavbarWrapper>
  );
};

export default Navbar;
