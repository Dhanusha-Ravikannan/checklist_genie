// import React, { useState } from 'react';
// import '../../admin/Checklist/Checklist.css';
// import Navbar from '../../../Pages/admin/Navbar/Navbar'

// const Checklist= () => {
 
//   const [update, setUpdated] = useState(false);
 
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [selectedUser, setSelectedUser] = useState('');

 

//   const handleUpdate = () => {
//     setUpdated(true);
//     setTimeout(() => setUpdated(false), 3000);
//   };

//   const handleShared = () => {
//     setDropdownVisible(true); 
//   };

//   const handleSelectUser = (user) => {
//     setSelectedUser(user);
//     setDropdownVisible(false); 
//     console.log(`Assigned to: ${user}`);
//   };

//   const users = ['Ashwin', 'Amal', 'Swetha', 'Krishna', 'Kiran', 'Devaraj'];
  

//   return (
//     <> 
//       <div className='dashboard-container'> 
//         <Navbar />
//         {update && <div className="alert-message-position">Saved Successfully!</div>}
       

//         <div className='content'> 
//           <div className='sky-position'> 
//             <div className='ready-check'> Checklist  </div>
//             <button className='add-position'>Add Items </button>
//             <br/>
//             <br/>


//             <table className='item-header'> 
//                 <tr> 
//                     <th> S.No </th>
//                     <th> Checklist Name</th>
//                     <th> Description</th>
//                 </tr>
//                 <tr>
//                     <td> </td>
//                 </tr>
//             </table>
            
//             <br />
            
//             <div className='ad'> 
//             <p> Priority</p>
//               <p onClick={handleUpdate}>Save</p> 
//               <p onClick={handleShared}>Assign to</p> 
//             </div>
                 
//         {dropdownVisible && (
//           <div className="dropdown">
//             {users.map((user, index) => (
//               <div key={index} onClick={() => handleSelectUser(user)} className="dropdown-option">
//                 {user}
//               </div>
//             ))}
//           </div>
//         )}
//           </div>
//         </div>
       


//         {selectedUser && <div className="selected-user-assign">Checklist Assigned to: {selectedUser}</div>}
//       </div>


//     </>
//   );
// };

// export default Checklist;

import React, { useState } from 'react';
import '../../admin/Checklist/Checklist.css';
import Navbar from '../../../Pages/admin/Navbar/Navbar';

const Checklist = () => {
  const [update, setUpdated] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [priorityVisible, setPriorityVisible] = useState(false); // New state for priority dropdown
  const [selectedPriority, setSelectedPriority] = useState('');  // Selected priority value

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

  const handlePriorityClick = () => {
    setPriorityVisible(!priorityVisible); // Toggle priority dropdown
  };

  const handleSelectPriority = (priority) => {
    setSelectedPriority(priority);
    setPriorityVisible(false);
    console.log(`Priority selected: ${priority}`);
  };

  const users = ['Ashwin', 'Amal', 'Swetha', 'Krishna', 'Kiran', 'Devaraj'];
  const priorities = ['High', 'Medium', 'Low']; // Priority options

  return (
    <>
      <div className='dashboard-container'>
        <Navbar />
        {update && <div className="alert-message-position">Saved Successfully!</div>}

        <div className='content'>
          <div className='sky-position'>
            <div className='ready-check'>Checklist</div>
            <button className='add-position'>Add Items</button>
            <br />
            <br />

            <table className='item-header'>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Checklist Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>fix the bug</td>
                  <td><textarea></textarea></td>
                </tr>
              </tbody>
            </table>

            <br />

            <div className='ad'>
              <p onClick={handlePriorityClick} className="priority-label">Priority: {selectedPriority || 'Select'}</p> 
              <p onClick={handleUpdate}>Save</p>
              <p onClick={handleShared}>Assign to</p>
            </div>

            
            {priorityVisible && (
              <div className="priority-dropdown">
                {priorities.map((priority, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectPriority(priority)}
                    className="dropdown-option"
                  >
                    {priority}
                  </div>
                ))}
              </div>
            )}

         
            {dropdownVisible && (
              <div className="dropdown">
                {users.map((user, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectUser(user)}
                    className="dropdown-option"
                  >
                    {user}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        
        {selectedUser && <div className="selected-user-assign">Checklist Assigned to: {selectedUser}</div>}
      </div>
    </>
  );
};

export default Checklist;
