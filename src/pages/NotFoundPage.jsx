import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFoundPage.css';

function NotFoundPage() {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Oops! Looks like Olivia didn’t write this page yet.</p>
      <Link to="/" className="back-home-btn">Take me back home</Link>
    </div>
  );
}

export default NotFoundPage;
