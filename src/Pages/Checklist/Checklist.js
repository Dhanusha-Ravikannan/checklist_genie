import React from 'react';
import Navbar from '../../Components/Navbar';
import '../../Pages/Checklist/Checklist.css';
import Checkbox from '@mui/material/Checkbox';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Checklist = () => {
  return (
    <> 
    <div className='dashboard-container'> 
    <div className='content'> 
    <Navbar/>
    
  
    <div className='tag'> Tags</div> 
    <br></br>
    <div className='sk'> 
    {/* <button style={{marginLeft:'55rem', width:'4rem',height:'2rem',backgroundColor:'black',borderRadius:'5px',color:'white',marginTop:'1rem'}}> Add+</button> */}
    
    {/* <div className='sk'>  </div> */}
    
    <div className='sea'> 
    <label> Select Tags</label> <span> </span>
     <input type='text' style={{marginLeft:'0.5rem',width:'20rem'}} placeholder='Search by Tag Name'></input> </div>
    <div className='awe'>
    <table style={{ backgroundColor: '#f9f9f9',
   borderRadius: '10px', padding:'1rem', width:'50rem',  
   boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} >
        <tr > 
            <th colSpan={4} style={{fontSize:'1.2rem'}} > Daily Summary Tags </th>
           
            
        </tr>
        <tr > 
            
            <td > <Checkbox {...label} />  Daily Clock In   </td>
            <td > <Checkbox {...label} /> Monday Meeting   </td>
            <td > <Checkbox {...label} /> Workdone email  </td>
            <td > <Checkbox {...label} /> Daily Clock out </td>
            
           
            
        </tr>
        <tr > 
            <th colSpan={4} style={{fontSize:'1.2rem'}} > Development Tags  </th>
           
            
        </tr>

        <tr > 
            
            <td >  <Checkbox {...label} /> Designing  </td>
            <td > <Checkbox {...label} /> Testing   </td>
            <td >  <Checkbox {...label} /> Debug </td>
            <td >  <Checkbox {...label} /> Deployment  </td>
          
            
        </tr>

        </table>
        
    </div>

    </div>
   
    </div>

    </div>

    </>
  )
}

export default Checklist

