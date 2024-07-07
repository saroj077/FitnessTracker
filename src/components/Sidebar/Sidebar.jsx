import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Logo from '../../assets/images/logo.png';
import './Sidebar.css';
import { SidebarData } from '../../Data/data';
import { FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate(); 

  const handleMenuItemClick = (index, path) => {
    setSelected(index);
    navigate(path); 
  };

  return (
    <div className="sidebar">
      <div className="logo" onClick={() => navigate('/dashboard')}> 
        <img src={Logo} alt="logo" />
      </div>
      <div className="menu">
        {SidebarData.map((item, index) => (
          <div
            className={selected === index ? 'menuItem active' : 'menuItem'}
            key={index}
            onClick={() => handleMenuItemClick(index, `/dashboard${item.path}`)} 
          >
            <item.icon />
            <span>{item.heading}</span>
          </div>
        ))}
        <div className="menuItem" onClick={() => console.log('Logging out')}>
          <FaSignOutAlt />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
