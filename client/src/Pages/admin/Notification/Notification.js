import React from 'react'
import '../../admin/Notification/Notification.css';

import Navbar from '../../../Pages/admin/Navbar/Navbar'


const Notification = () => {
  return (
    <>
     <div className='dashboard-container'> 
    <Navbar/>
  
    <h2 className='notify'> Notifications</h2>
    
    <div className='okay'>  
    <h3 className='data'> From UserName: </h3>
    <input className='input-width' placeholder=' Checklist 1 comments '/>
      </div>
    </div>
   
    </>
  )
}

export default Notification



