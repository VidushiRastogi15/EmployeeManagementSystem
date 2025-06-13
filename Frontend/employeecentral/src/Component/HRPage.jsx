import React, { useState, useEffect } from 'react';
import './HrPage.css';
 
const HRPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [showEmployeeIdInput, setShowEmployeeIdInput] = useState(false);
 
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
 
  const fetchEmployees = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('You are not authorized to perform this action');
      return;
    }
    try {
      const response = await fetch('http://localhost:3030/employees/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      } else {
        alert('Failed to fetch employees');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching the employees');
    }
  };
 
  const handleEmployeeIdChange = (e) => {
    setEmployeeId(e.target.value);
  };
 
  const fetchEmployeeById = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('You are not authorized to perform this action');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3030/employees/${employeeId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setEmployeeDetails(data);
      } else {
        alert('Failed to fetch employee details');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching the employee details');
    }
  };
 
  return (
    <div className='hr-page-container'>
    <div className="hr-page">
      <h2>HR Actions</h2>
      {isAuthenticated ? (
        <>
          <div>
            <button className='topics' onClick={fetchEmployees}>Get All Employees</button>
          </div>
          {employees.length > 0 && (
            <div>
              <h3>Employee List:</h3>
              <ul>
                {employees.map((employee) => (
                  <li key={employee.id}>
                    {employee.name} - {employee.department} - {employee.email} - {employee.phone} - {employee.reportingManager}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <button className='topics' onClick={() => setShowEmployeeIdInput(true)}>Get Employee By Id</button>
          </div>
          {showEmployeeIdInput && (
            <div>
              <input
                type="text"
                placeholder="Enter Employee ID"
                value={employeeId}
                onChange={handleEmployeeIdChange}
              />
              <button onClick={fetchEmployeeById}>Fetch Employee</button>
            </div>
          )}
          {employeeDetails && (
            <div>
              <h3>Employee Details:</h3>
              <p>Name: {employeeDetails.name}</p>
              <p>Department: {employeeDetails.department}</p>
              <p>Email: {employeeDetails.email}</p>
              <p>Phone: {employeeDetails.phone}</p>
              <p>Reporting Manager: {employeeDetails.reportingManager}</p>
              <p>Username: {employeeDetails.user.username}</p>
              <p>Role: {employeeDetails.user.role}</p>
            </div>
          )}
        </>
      ) : (
        <p>You are not authorized to view this page. Please log in.</p>
      )}
    </div>
    </div>
  );
};
 
export default HRPage;
 