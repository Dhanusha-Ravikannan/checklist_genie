
import React from 'react'
import Navbar from '../../../Pages/admin/Navbar/Navbar'
import '../Details/Details.css';
import { FaEye } from "react-icons/fa";




const Details = () => {
  return (
    <> 
     <div className='dashboard-container'> 
    <Navbar/>
    <h2 className='task-allignment'> Checklist Details</h2>
    <div className='details-outline' > 
   
    <table className='table-width'>
                
                  <tr> 
                    <th>S.No</th>
                    <th>Assigned Checklist</th>
                    <th> Date</th>
                    <th> Priority</th>
                    <th>Completed Checklist</th>
                    <th>Pending Checklist</th>
                    <th>Comments</th>
                    <th> View </th>
                    
                  </tr>
                
                <tbody>
                  <tr> 
                    <td>1 </td>
                    <td> Carrer Sheets </td>
                    <td> 26-09-2024 </td>
                    <td> High </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> < FaEye style={{fontSize:'1.5rem'}} /></td>
                  </tr>
                  
                    
                </tbody>
              </table>

              
              </div>
              <br/><br/>
              <h2 className='report-position'> Reports </h2>
              
             


            
    </div>
    </>
  )
}

export default Details

