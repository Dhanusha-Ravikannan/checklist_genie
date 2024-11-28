import React, { useEffect, useState } from 'react';
import './Login1.css';
import imagelogo from "../../../Assets/logo.jpg";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; 

const Login1 = () => {
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storeTokenNew = () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      if (token) {
        localStorage.setItem('token', token);
        console.log('Token stored from URL:', token);
      } 
    };

    storeTokenNew();

    const checkExistingRoles = async () => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        console.log('No token found');
        navigate('/'); 
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/position/getPosition`,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
           console.log("Roles for this ID ",response.data)
          
        const existingRoles = response.data;

         if (existingRoles.length > 0) {
          console.log('Roles already selected:', existingRoles);
          navigate('/User/Browse'); 
        } else {
          setLoading(false); 
        }
      } catch (error) {
        console.error('Error fetching user roles:', error);
        setLoading(false); 
      }
    };

    checkExistingRoles();
  }, [location.search, navigate]);





  const handleToggle = (department) => {
    setSelectedDepartments((prev) =>
      prev.includes(department)
        ? prev.filter((d) => d !== department)
        : [...prev, department]
    );
  };

  const handleSave = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        console.log('No token found, user needs to log in');
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/position/createPosition`, 
        { user_position: selectedDepartments },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`, 
          },
        }
      );

      console.log('Roles saved successfully:', response.data);
      navigate('/User/Browse');
    } catch (error) {
      console.error('Error saving user positions:', error);
      alert('Error saving user positions');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); 
  };

  const departments = [
    'FULL_STACK_DEVELOPER',
    'POWER_BI_DEVELOPER',
    'SALES',
    'SALESFORCE',
    'TESTING',
    'HUMAN_RESOURCE',
    'ADMIN',
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

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
            className={`but-position ${selectedDepartments.includes(department) ? 'active' : ''}`}
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





