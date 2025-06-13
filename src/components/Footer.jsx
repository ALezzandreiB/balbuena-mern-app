import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 Olivia Rodrigo. All rights reserved.</p>
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/articles">Articles</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
