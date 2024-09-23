import React from 'react'
import '../../admin/Notification/Notification.css';
import Navbar from '../../../Components/Navbar';


const Notification = () => {
  return (
    <>
     <div className='dashboard-container'> 
    <Navbar/>
  
    <h2 className='notify'> Notification</h2>
    
    <div className='okay'>  
    <h3 className='data'> From: <input placeholder='User Name'/> </h3>
      </div>
    </div>
   
   
    </>
  )
}

export default Notification



