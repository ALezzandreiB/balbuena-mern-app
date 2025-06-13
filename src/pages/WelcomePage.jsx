// WelcomePage.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import "../styles/Welcome.css"; 

function WelcomePage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name'); 

  return (
    <div className="welcome-container">
      <h1>Welcome!</h1>
      <p> <strong>{name}</strong>! You have successfully logged in.</p>
    </div>
  );
}

export default WelcomePage;
