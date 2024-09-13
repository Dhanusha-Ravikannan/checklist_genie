import React from 'react'
import '../../Pages/Template/Template.css';
import Navbar from '../../Components/Navbar';
import Checkbox from '@mui/material/Checkbox';
import { faPen, faTrash} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Template = () => {
  return (
    <> 
      <div className='dashboard-container'> 
    <Navbar/>
    <div className='content'> 

        <div className='sky'> 
    <div className='ready' > PROJECT TITLE  <button className='dd'> Add+ </button> </div>
    
    
    <div className='awesome'>
    <table >
        <tr > 
            <th > S.No </th>
            <th > Template Name </th>
            <th > Yes </th>
            <th > No  </th>
            <th > Action  </th>
        </tr>
        <tr > 
            <td > 1.  </td>
            <td > Daily Clock In   </td>
            <td > <Checkbox {...label} />  </td>
            <td > <Checkbox {...label} />  </td>
            <td > <button > <FontAwesomeIcon icon={faPen}/> </button> <span> </span> <button > <FontAwesomeIcon icon={faTrash}  />   </button> </td>
            
        </tr>
        <tr > 
            <td > 2.  </td>
            <td > Monday Meeting  </td>
            <td > <Checkbox {...label} />  </td>
            <td > <Checkbox {...label} />  </td>
            {/* <td ><button className='shade'> Edit </button>  <button className='paint'> Delete  </button> </td> */}
            <td > <button > <FontAwesomeIcon icon={faPen}/> </button> <span> </span> <button > <FontAwesomeIcon icon={faTrash}  />   </button> </td>

        </tr>
        <tr > 
            <td > 3.  </td>
            <td > Testing </td>
            <td > <Checkbox {...label} /> </td>
            <td > <Checkbox {...label} />  </td>
            {/* <td > <button className='shade'> Edit </button>   <button className='paint'> Delete  </button>  </td> */}
            <td > <button > <FontAwesomeIcon icon={faPen}/> </button> <span> </span> <button > <FontAwesomeIcon icon={faTrash}  />   </button> </td>

        </tr>
        <tr > 
            <td > 4.  </td>
            <td > Workdone email </td>
            <td > <Checkbox {...label} /> </td>
            <td > <Checkbox {...label} />  </td>
            {/* <td > <button className='shade'> Edit </button>  <button className='paint'> Delete  </button>  </td> */}
            <td > <button > <FontAwesomeIcon icon={faPen}/> </button> <span> </span> <button > <FontAwesomeIcon icon={faTrash}  />   </button> </td>

        </tr>
        <tr > 
            <td > 5.  </td>
            <td > Daily Clock out </td>
            <td > <Checkbox {...label} /> </td>
            <td > <Checkbox {...label} />  </td>
            {/* <td > <button className='shade'> Edit </button>  <button className='paint'> Delete  </button>  </td> */}
            <td > <button > <FontAwesomeIcon icon={faPen}/> </button> <span> </span> <button > <FontAwesomeIcon icon={faTrash}  />   </button> </td>

        </tr>
       
          
       
    </table>
    </div>
    <br/><div className='ad'> 
    <p> Update </p> <p>  Share  </p> </div></div>
    {/* <button className='cork'> Add </button><button className='corkk'> Update </button><button className='corkkk'> Share </button> */}
   
    </div>




    
    </div>
  
    </>
  )
}

export default Template