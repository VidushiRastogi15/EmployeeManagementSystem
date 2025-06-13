import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3030/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
 
      if (response.ok) {
        const data = await response.json();
        const { token, role } = data;
 
        // Store token in sessionStorage
        sessionStorage.setItem('token', token);
 
        // Update login state
        onLogin(token);
 
        // Redirect based on role
        if (role === 'ROLE_ADMIN') {
          navigate('/admin');
        } else if (role === 'ROLE_HR') {
          navigate('/hr');
        } else if (role === 'ROLE_EMPLOYEE') {
          navigate('/employee');
        }
      } else {
        // Handle login failure
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
 
  return (
    <div className="login-wrapper">
      <div className="login-page">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};
 
export default Login;