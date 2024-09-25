import React, { useState } from 'react';
import '../../admin/Template/Template.css';
import Navbar from '../../../Pages/admin/Navbar/Navbar'
import Checkbox from '@mui/material/Checkbox';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Template = () => {
  const [activeCheckbox, setActiveCheckbox] = useState(null);
  const [update, setUpdated] = useState(false);
 
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');

  const handleCheckboxChange = (index) => {
    setActiveCheckbox(index);
  };

  const handleUpdate = () => {
    setUpdated(true);
    setTimeout(() => setUpdated(false), 3000);
  };

  const handleShared = () => {
    setDropdownVisible(true); 
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setDropdownVisible(false); 
    console.log(`Assigned to: ${user}`);
  };

  const users = ['Ashwin', 'Amal', 'Swetha', 'Krishna', 'Kiran', 'Devaraj'];
  

  return (
    <> 
      <div className='dashboard-container'> 
        <Navbar />
        {update && <div className="alert-message-position">Updated Successfully!</div>}
       

        <div className='content'> 
          <div className='sky'> 
            <div className='ready'> Daily Checklist Template </div>
            <div className='awesome'>
              <table>
                <thead>
                  <tr> 
                    <th>S.No</th>
                    <th>Checklist Items</th>
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
                        <button><FontAwesomeIcon icon={faPen} /></button>
                        <span></span>
                        <button><FontAwesomeIcon icon={faTrash} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <br />
            <button className='dd'>Add Items </button>

            <button className='priority-position'> Priority</button>


            

            <div className='ad'> 
              <p onClick={handleUpdate}>Update</p> 
              <p onClick={handleShared}>Share to</p> 
            </div>
                 
        {dropdownVisible && (
          <div className="dropdown">
            {users.map((user, index) => (
              <div key={index} onClick={() => handleSelectUser(user)} className="dropdown-option">
                {user}
              </div>
            ))}
          </div>
        )}
          </div>
        </div>


        {selectedUser && <div className="selected-user">Daily Checklist Shared to: {selectedUser}</div>}
      </div>


    </>
  );
};

export default Template;

