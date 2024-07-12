import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MaybeShowNavBar = ({ children }) => {
  const location = useLocation();
  const [showNavBar, setShowNavBar] = useState(true);

  useEffect(() => {
    // Check if the current path starts with '/dashboard'
    if (location.pathname.startsWith('/dashboard')) {
      setShowNavBar(false); // Hide navbar for dashboard pages
    } if (location.pathname.startsWith('/dashboard/profile')) {
      setShowNavBar(false); // Hide navbar for dashboard pages
    } else {
      setShowNavBar(true); // Show navbar for other pages
    }

  }, [location]);

  // Render children only if showNavBar is true
  return showNavBar ? <>{children}</> : null;
};

export default MaybeShowNavBar;
