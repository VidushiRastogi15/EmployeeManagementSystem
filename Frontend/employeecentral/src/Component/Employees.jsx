import React, { useState } from 'react';
import './Employees.css';
 
const Employees = () => {
  const [profile, setProfile] = useState(null);
 
  const getProfile = async () => {
    try {
      const response = await fetch('http://localhost:3030/employees/profile/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`, // Assuming token is stored in sessionStorage
        },
      });
 
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        alert('Failed to fetch profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };
 
  return (
    <div className='employee-container' >
    <div className="employee-page">
      <h2 className="employee-heading"> Employee Actions</h2>
      <div>
        <button className="submit-btn" onClick={getProfile}>Get My Profile</button>
      </div>
      {profile && (
        <div className="profile-details">
          <h3>Profile Details:</h3>
          <p><strong>ID:</strong> {profile.id}</p>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Department:</strong> {profile.department}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Reporting Manager:</strong> {profile.reportingManager}</p>
          <p><strong>Username:</strong> {profile.user.username}</p>
        </div>
      )}
    </div>
    </div>
  );
};
 
export default Employees;
 
 