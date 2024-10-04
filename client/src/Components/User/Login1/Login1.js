
import React, { useState } from 'react';
import './Login1.css';
import Navbar from '../Navbar/Navbar';

const Login1 = () => {
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  const handleToggle = (department) => {
    setSelectedDepartments((prev) =>
      prev.includes(department)
        ? prev.filter((d) => d !== department)
        : [...prev, department]
    );
  };

  const handleSave = () => {
    
    console.log('Saved departments:', selectedDepartments);
  };

  const departments = [
    'Full Stack Developer',
    'Power BI Developer',
    'Sales',
    'Human Resource',
    'Testing',
    'Salesforce'
  ];

  return (
    <> 
      <Navbar />
      <h2 className='choose'> Choose your domain </h2>
      {departments.map((department) => (
        <h2 className='department' key={department}>
          <button
            className={`but-position ${selectedDepartments.includes(department) ? 'active' : ''}`}
            onClick={() => handleToggle(department)}
          >
            {department}
          </button>
        </h2>
      ))}
      <div className='save-position'>
        <button className='save-but' onClick={handleSave}> Save </button>
      </div>
    </>
  );
};

export default Login1;
