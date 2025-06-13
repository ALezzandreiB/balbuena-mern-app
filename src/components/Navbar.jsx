import React from 'react';
import { Link } from 'react-router-dom'; // We will use Link here
import '../styles/Navbar.css';
import logo from '../assets/images/logo.png'; 
import Button from './button';

function Navbar() {
  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/articles">Articles</Link>
        </li>
      </ul>
      <Link to="/oops-not-found">Broken Link</Link>
      {/* Use Link to navigate to the login page */}
      <Link to="/login">
        <Button>Login</Button> {/* When clicked, it will go to /login */}
      </Link>
    </nav>
  );
}

export default Navbar;
