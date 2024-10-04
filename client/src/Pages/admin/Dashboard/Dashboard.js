
import * as React from 'react';
import '../Dashboard/Dashboard.css';
import ash from '../../../Assets/ashvin.png';
import amal from '../../../Assets/ashvin.png';
import swetha from '../../../Assets/swetha.png';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../Pages/admin/Navbar/Navbar'



export default function Dashboard() {
  const navigate = useNavigate();

  const individualdetails = (name) => {
    navigate('/admin/details', { state: { developerName: name } });
  };

  return (
    <>
      <div className='dashboard-container'>
        <Navbar />
        <div className='content'>
          <div className='skyy'>
            <div className='full'>FULL STACK DEVELOPERS</div>
            <div className='cardd'>
              <img src={ash} alt='ashpic' className='pic' />
              <h2 className='vin'>Ashvin <input className='in' type='text' placeholder='85%' /></h2>
              <h3 className='more' onClick={() => individualdetails('Ashvin')}>View More</h3>
            </div>
            <div className='cardd'>
              <img src={amal} alt='amalpic' className='pic' />
              <h2 className='vin'>Amal <input className='in' type='text' placeholder='85%' /></h2>
              <h3 className='more' onClick={() => individualdetails('Amal')}>View More</h3>
            </div>
            <div className='cardd'>
              <img src={swetha} alt='swethapic' className='pic' />
              <h2 className='vin'>Swetha <input type='text' className='in' placeholder='85%' /></h2>
              <h3 className='more' onClick={() => individualdetails('Swetha')}>View More</h3>
            </div>
            <div className='cardd'>
              <img src={amal} alt='krishnapic' className='pic' />
              <h2 className='vin'>Krishna <input type='text' className='in' placeholder='85%' /></h2>
              <h3 className='more' onClick={() => individualdetails('Krishna')}>View More</h3>
            </div>
            <div className='power'>POWER BI DEVELOPERS</div>
            <div className='cardd'>
              <img src={ash} alt='devarajpic' className='pic' />
              <h2 className='vin'>Devaraj <input type='text' className='in' placeholder='85%' /></h2>
              <h3 className='more' onClick={() => individualdetails('Devaraj')}>View More</h3>
            </div>
            <div className='cardd'>
              <img src={amal} alt='kiranpic' className='pic' />
              <h2 className='vin'>Kiran <input className='in' type='text' placeholder='85%' /></h2>
              <h3 className='more' onClick={() => individualdetails('Kiran')}>View More</h3>
            </div>
            <div className='power'>SALES TEAM</div>
            <div className='cardd'>
              <img src={ash} alt='devarajpic' className='pic' />
              <h2 className='vin'>Selva <input type='text' className='in' placeholder='85%' /></h2>
              <h3 className='more' onClick={() => individualdetails('Devaraj')}>View More</h3>
            </div>
          
          </div>
        </div>
      </div>
    </>
  );
}

