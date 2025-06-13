import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const Navbar = ({ isAuthenticated, handleLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Employee Management System</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        {!isAuthenticated ? (
          <li><Link to="/login">Login</Link></li>
        ) : (
          <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
