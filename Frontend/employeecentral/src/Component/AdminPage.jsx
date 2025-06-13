import React, { useState, useEffect } from 'react';
import './AdminPage.css';
 
const AdminPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    email: '',
    phone: '',
    reportingManager: '',
    username: '',
    password: ''
  }); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [showEmployeeIdInput, setShowEmployeeIdInput] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
  name: '',
  department: '',
  email: '',
  phone: '',
  reportingManager: '',
  username: '',
  password: ''
});
const [deleteEmployeeId, setDeleteEmployeeId] = useState('');
const [showDeleteForm, setShowDeleteForm] = useState(false);
 
 
 
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
 
  const handleDeleteChange = (e) => {
    setDeleteEmployeeId(e.target.value);
  };
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
 
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData({
      ...updateFormData,
      [name]: value
    });
  };
  const handleDeleteSubmit = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('You are not authorized to perform this action');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3030/employees/${deleteEmployeeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        alert('Employee Deleted Successfully');
        setDeleteEmployeeId('');
      } else {
        alert('Failed to delete employee');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while deleting the employee');
    }
  };
 
 
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('You are not authorized to perform this action');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3030/employees/${employeeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateFormData)
      });
      if (response.ok) {
        alert('Employee Updated Successfully');
        setShowUpdateForm(false);
        setUpdateFormData({
          name: '',
          department: '',
          email: '',
          phone: '',
          reportingManager: '',
          username: '',
          password: ''
        });
      } else {
        alert('Failed to update employee');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating the employee');
    }
  };
 
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('You are not authorized to perform this action');
      return;
    }
    try {
      const response = await fetch('http://localhost:3030/employees/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Employee Created Successfully');
        setShowForm(false);
        setFormData({
          name: '',
          department: '',
          email: '',
          phone: '',
          reportingManager: '',
          username: '',
          password: ''
        });
      } else {
        alert('Failed to create employee');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the employee');
    }
  };
 
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
        alert('Employee does not exist with that ID');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching the employee details');
    }
  };
 
  return (
    <div className="admin-container">
    <div className="admin-page">
      <h2>Admin Actions</h2>
      {isAuthenticated ? (
        <>
          <div className="topics">
            <button onClick={() => setShowForm(true)}>Create Employee</button>
          </div>
          {showForm && (
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name:</label>
                <input className="form-input" type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <label>Department:</label>
                <input className="form-input" type="text" name="department" value={formData.department} onChange={handleChange} required />
              </div>
              <div>
                <label>Email:</label>
                <input className="form-input" type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <label>Phone:</label>
                <input className="form-input" type="text" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
              <div>
                <label>Reporting Manager:</label>
                <input className="form-input" type="text" name="reportingManager" value={formData.reportingManager} onChange={handleChange} required />
              </div>
              <div>
                <label>Username:</label>
                <input className="form-input" type="text" name="username" value={formData.username} onChange={handleChange} required />
              </div>
              <div>
                <label>Password:</label>
                <input className="form-input" type="password" name="password" value={formData.password} onChange={handleChange} required />
              </div>
              <button className='submitbtn' type="submit">Submit</button>
            </form>
          )}
          <div className="topics">
            <button onClick={fetchEmployees}>Get All Employees</button>
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
          <div className="topics">
            <button onClick={() => setShowEmployeeIdInput(true)}>Get Employee By Id</button>
          </div>
          {showEmployeeIdInput && (
            <div>
              <input
                className="form-input"
                type="text"
                placeholder="Enter Employee ID"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
              <button className='submitbtn' onClick={fetchEmployeeById}>Fetch Employee</button>
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
      <div className="topics">
  <button onClick={() => setShowUpdateForm(true)}>Update Employee by Id</button>
</div>
{showUpdateForm && (
  <form onSubmit={handleUpdateSubmit}>
    <div>
      <label>Employee ID:</label>
      <input
        className="form-input"
        type="text"
        placeholder="Enter Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        required
      />
    </div>
    <div>
      <label>Name:</label>
      <input className="form-input" type="text" name="name" value={updateFormData.name} onChange={handleUpdateChange} required />
    </div>
    <div>
      <label>Department:</label>
      <input className="form-input" type="text" name="department" value={updateFormData.department} onChange={handleUpdateChange} required />
    </div>
    <div>
      <label>Email:</label>
      <input className="form-input" type="email" name="email" value={updateFormData.email} onChange={handleUpdateChange} required />
    </div>
    <div>
      <label>Phone:</label>
      <input className="form-input" type="text" name="phone" value={updateFormData.phone} onChange={handleUpdateChange} required />
    </div>
    <div>
      <label>Reporting Manager:</label>
      <input className="form-input" type="text" name="reportingManager" value={updateFormData.reportingManager} onChange={handleUpdateChange} required />
    </div>
    <div>
      <label>Username:</label>
      <input className="form-input" type="text" name="username" value={updateFormData.username} onChange={handleUpdateChange} required />
    </div>
    <div>
      <label>Password:</label>
      <input className="form-input" type="password" name="password" value={updateFormData.password} onChange={handleUpdateChange} required />
    </div>
    <button className='submitbtn' type="submit">Save</button>
  </form>
)}
<div className="topics">
  <button onClick={() => setShowDeleteForm(true)}>Delete Employee</button>
</div>
{showDeleteForm && (
  <div>
    <input
      className="form-input"
      type="text"
      placeholder="Enter Employee ID"
      value={deleteEmployeeId}
      onChange={handleDeleteChange}
    />
    <button className='submitbtn' onClick={handleDeleteSubmit}>Delete</button>
  </div>
)}
 
    </div>
    </div>
  );
};
 
export default AdminPage;
 
 