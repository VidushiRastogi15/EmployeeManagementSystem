import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import LoginPage from './Component/Login';
import AdminPage from './Component/AdminPage';
import HRPage from './Component/HRPage';
import Employees from './Component/Employees';
import './App.css'; // Import the new CSS file
import Navbar from './Component/NavBar';
 
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
 
    useEffect(() => {
        // Check if user is logged in by checking session storage
        const token = sessionStorage.getItem('token');
        console.log('User from session storage:', token); // Debug log
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);
 
    return (
        <Router>
            <AppContent isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Router>
    );
}
 
function AppContent({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();
 
    const handleLogout = () => {
        console.log('Logging out...'); // Debug log
        sessionStorage.clear();
        setIsLoggedIn(false);
        navigate('/'); // Navigate to homepage
    };
 
    const handleLogin = (token) => {
        sessionStorage.setItem('token', token);
        setIsLoggedIn(true);
    };
 
    const handleHomeClick = () => {
        if (isLoggedIn) {
            handleLogout();
        } else {
            navigate('/');
        }
    };
 
    return (
        <div>
            {/* <nav className="navbar">
                <Link to="/" className="nav-link" onClick={handleHomeClick}>Home</Link>
                {!isLoggedIn && <Link to="/login" className="nav-link">Login</Link>}
                {isLoggedIn && <button onClick={handleLogout} className="nav-link">Logout</button>}
            </nav> */}
            <Navbar isAuthenticated={isLoggedIn} handleLogout={handleLogout} />

            <Routes>
                <Route path="/" element={<h1 className="center">Welcome to Employee Management System!</h1>} />
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/hr" element={<HRPage />} />
                <Route path="/employee" element={<Employees />} />
            </Routes>
        </div>
    );
}
 
export default App;
 
 