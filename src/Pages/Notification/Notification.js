import React from 'react'
import Navbar from '../../Components/Navbar';
import '../../Pages/Notification/Notification.css'


const Notification = () => {
  return (
    <>
     <div className='dashboard-container'> 
    <Navbar/>
    
    
    <h2 className='notify'> Notification</h2>
    
    <div className='okay'> 
    <h3 className='data'> From: <input placeholder='User Name'/> </h3>
      {/* <label> Enter the Message you want to send: <input/></label>
     
      <label> Choose the member you want to send: <input/></label> */}
      </div>
    </div>
   
   
    </>
  )
}

export default Notification



