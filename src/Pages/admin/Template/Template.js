
import React, { useState } from 'react';
import '../../admin/Template/Template.css';
import Navbar from '../../../Components/Navbar';
import Checkbox from '@mui/material/Checkbox';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Template = () => {
  const [activeCheckbox, setActiveCheckbox] = useState(null);

 const handleCheckboxChange = (index) => {
    setActiveCheckbox(index);
  };


  const [update, setUpdated] = useState(false);
  const [shared, setShared] = useState(false);


  const handleUpdate = () => {
    setUpdated(true);
    setTimeout(() => setUpdated(false), 3000);
  };

  const handleShared = () => {
    setShared(true);
    setTimeout(() => setShared(false), 3000);
  };



  return (
    <> 
      <div className='dashboard-container'> 
        <Navbar/>
        {update && <div className="alert-message-position">Updated Successfully!</div>}
        {shared && <div className="alert-message-position">Shared Successfully!</div>}
        <div className='content'> 
          <div className='sky'> 
            <div className='ready'> PROJECT TITLE </div>
            <div className='awesome'>
              <table>
                <thead>
                  <tr> 
                    <th>S.No</th>
                    <th>Template Name</th>
                    <th>Yes</th>
                    <th>No</th>
                    <th>Comments</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {['Daily Clock In', 'Monday Meeting', 'Workdone email', 'Daily Clock out'].map((template, index) => (
                    <tr key={index}>
                      <td>{index + 1}.</td>
                      <td>{template}</td>
                      <td>
                        <Checkbox 
                          {...label} 
                          checked={activeCheckbox === index} 
                          onChange={() => handleCheckboxChange(index)} 
                        />
                      </td>
                      <td>
                        <Checkbox 
                          {...label} 
                          checked={activeCheckbox === index + 5} 
                          onChange={() => handleCheckboxChange(index + 5)} 
                        />
                      </td>
                      <td>
                        <textarea></textarea>
                      </td>
                      <td>
                        <button><FontAwesomeIcon icon={faPen}/></button>
                        <span></span>
                        <button><FontAwesomeIcon icon={faTrash}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <br />
            <button className='dd'>Add +</button>
            <div className='ad'> 
              <p onClick={handleUpdate}>Update</p> 
              <p onClick={handleShared}>Share</p> 
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template;




