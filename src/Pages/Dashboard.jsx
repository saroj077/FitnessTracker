import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import MainDash from '../components/MainDash/MainDash';
import Workouts from '../components/Workouts/Workouts';
import Commerce from '../components/Commerce/Commerce';
import Foods from '../components/Foods/Foods';
import Cart from '../components/Commerce/Cart';
import './Dashboard.css';

const Dashboard = () => {
  useEffect(() => {
    // Create a script element
    const script1 = document.createElement('script');
    script1.src = "https://www.chatbase.co/embed.min.js";
    script1.defer = true;
    script1.setAttribute('chatbotId', 'taS5kbRfITiHMFf0Nh_qf');
    script1.setAttribute('domain', 'www.chatbase.co');

    // Create a second script element for the configuration
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.embeddedChatbotConfig = {
        chatbotId: "taS5kbRfITiHMFf0Nh_qf",
        domain: "www.chatbase.co"
      };
    `;

    // Append the scripts to the document body
    document.body.appendChild(script2);
    document.body.appendChild(script1);

    // Cleanup the scripts when the component is unmounted
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <div className='dashboard'>
      <Sidebar />
      <div className='main-content'>
        <Routes>
          <Route path="/" element={<MainDash />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/commerce" element={<Commerce />} />
          <Route path="/commerce/cart" element={<Cart />} />
          <Route path="/foods/*" element={<Foods />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
