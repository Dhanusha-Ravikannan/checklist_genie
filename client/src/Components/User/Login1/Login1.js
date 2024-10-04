

import React, { useState } from 'react';
import './Login1.css';
import imagelogo from "../../../Assets/logo.jpg";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Login1 = () => {
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = (department) => {
    setSelectedDepartments((prev) =>
      prev.includes(department)
        ? prev.filter((d) => d !== department)
        : [...prev, department]
    );
  };

  const handleSave = () => {
    console.log('Saved departments:', selectedDepartments);
    navigate('/User/Browse')
  };

  const handleLogout = () => {
    
    navigate('/'); 
  };

  const departments = [
    'Full Stack Developer',
    'Power BI Developer',
    'Sales',
    'Human Resource',
    'Testing',
    'Salesforce',
  ];

  return (
    <>
      <div className='color'>
        <IoPersonCircleSharp
          className='ir'
          style={{
            position: 'absolute',
            right: '15px',
            top: '4.5%',
            transform: 'translateY(-50%)',
            fontSize: '43px',
            cursor: 'pointer',
            color: 'white',
          }}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />
        {dropdownOpen && (
          <div
            className="dropdown-menu"
            style={{
              position: 'absolute',
              top: '60px', 
              right: '15px',
              backgroundColor: 'white',
              padding: '10px',
              borderRadius: '5px',
              boxShadow: '0 0 5px rgba(0,0,0,0.3)',
              zIndex: 1000,
            }}
          >
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
        <img src={imagelogo} alt="logo" className="log" />
      </div>
      <br />
      <br />
      <h2 className='choose'>Choose your domain</h2>
      {departments.map((department) => (
        <h2 className='department' key={department}>
          <button
            className={`but-position ${
              selectedDepartments.includes(department) ? 'active' : ''
            }`}
            onClick={() => handleToggle(department)}
          >
            {department}
          </button>
        </h2>
      ))}
      <div className='save-position'>
        <button className='save-but' onClick={handleSave}>
          Save
        </button>
      </div>
    </>
  );
};

export default Login1;
