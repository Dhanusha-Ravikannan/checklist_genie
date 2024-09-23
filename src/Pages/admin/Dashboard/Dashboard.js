import * as React from 'react';
import '../Dashboard/Dashboard.css';
import '../../../Components/Navbar/Navbar.css';
import ash from '../../../Assets/ashvin.png';
import amal from '../../../Assets/ashvin.png';
import swetha from '../../../Assets/swetha.png';
import Navbar from '../../../Components/Navbar';






export default function Dashboard() {
  return (
    <>
      <div className='dashboard-container'>
    <Navbar/>
    <div className='content'> 
    <div className='skyy'> 
      <div className='full'> FULL STACK DEVELOPERS </div>
      <div className='card'>
        <img src={ash} alt='ashpic' className='pic'/>
        <h2 className='vin'  > Ashvin<input className='in' type='text' placeholder='95%' />   </h2>
        <h3 className='more'> View More</h3>
       </div>
       <div className='card'>
        <img src={amal} alt='ashpic' className='pic'/>
        <h2 className='vin'> Amal <input className='in' type='text'  placeholder='85%'/></h2>
        <h3 className='more'> View More</h3>
       </div>
       <div className='card'>
        <img src={swetha} alt='swetha' className='pic'/>
        <h2 className='vin'> Swetha<input type='text' className='in' placeholder='77%'/> </h2>
        <h3 className='more'> View More</h3>
       </div>
       <div className='card'>
        <img src={amal} alt='ashpic' className='pic'/>
        <h2 className='vin'> Krishna<input type='text' className='in' placeholder='70%'/> </h2>
        <h3 className='more'> View More</h3>
       </div>
       <div className='power'> POWER BI DEVELOPERS</div>
       <div className='card'>
        <img src={ash} alt='ashpic' className='pic'/>
        <h2 className='vin'> Devaraj<input type='text' className='in' placeholder='70%'/> </h2>
        <h3 className='more'> View More</h3>
       </div>
       <div className='card'>
        <img src={amal} alt='ashpic' className='pic'/>
        <h2 className='vin'> Kiran<input type='text' className='in' placeholder='80%'/> </h2>
        <h3 className='more'> View More</h3>
       </div>
       </div>
       </div>
       </div>
      
    
    </>
  );
}
