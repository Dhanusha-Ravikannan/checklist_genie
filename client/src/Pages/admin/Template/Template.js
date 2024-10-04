
// import React, { useState } from 'react';
// import '../../admin/Template/Template.css';
// import Navbar from '../../../Pages/admin/Navbar/Navbar';
// import { Menu, MenuItem } from '@mui/material';
// import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// const Template = () => {
//   const [update, setUpdated] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null); 
//   const [sharedUser, setSharedUser] = useState(''); 
//   const [items, setItems] = useState([
//     { description: 'Daily ClockIn', type: 'yesNo', comments: '' },
//     { description: 'Monday Meeting', type: 'yesNo', comments: '' },
//     { description: 'Workdone email', type: 'yesNo', comments: '' },
//     { description: 'Daily Clockout', type: 'yesNo', comments: '' },
//     { description: 'No of tasks completed', type: 'input', comments: '' }
//   ]);

//   const handleUpdate = () => {
//     setUpdated(true);
//     setTimeout(() => setUpdated(false), 3000);
//   };

//   const handleShareClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleSelectUser = (user) => {
//     setAnchorEl(null);
//     setSharedUser(user); 
//   };

//   const handleAddItem = () => {
//     setItems([...items, { description: '', type: 'yesNo', comments: '' }]);
//   };


//   const handleDescriptionChange = (index, event) => {
//     const updatedItems = [...items];
//     updatedItems[index].description = event.target.value;
//     setItems(updatedItems);
//   };

//   const handleCommentsChange = (index, event) => {
//     const updatedItems = [...items];
//     updatedItems[index].comments = event.target.value;
//     setItems(updatedItems);
//   };



//   return (
//     <>
//       <div className='dashboard-container'>
//         <Navbar />
//         {update && <div className="alert-message-position">Updated Successfully!</div>}
//         {sharedUser && <div className="alert-message-position">Checklist is shared with {sharedUser}!</div>}

//         <h2 className='template'>Daily Checklist</h2> 
//         <button className='items-position' onClick={handleAddItem}>Add Items</button>

//         <div className='back-position'>
//           <table className='template-position'>
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 <th>Checklist Items</th>
//                 <th>Type</th>
//                 <th>Comments</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}.</td>
                  
//                   <td>
//                     <input
//                       type="text"
//                       value={item.description}
//                       onChange={(event) => handleDescriptionChange(index, event)}
//                       placeholder="Enter item description"
//                     />
//                   </td>
//                   <td>  Select</td>
                  
                  
//                   <td>
//                     <textarea
//                       value={item.comments}
//                       onChange={(event) => handleCommentsChange(index, event)}
//                       placeholder="Add comments"
//                     />
//                   </td>
//                   <td>
//                     <button><FontAwesomeIcon icon={faPen} /> </button>
//                     <button><FontAwesomeIcon icon={faTrash} /></button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className='same-line'>
//           <button> Date  <input type='date'/></button>  
//           <button onClick={handleUpdate}>Save</button>
//           <button onClick={handleShareClick}>Share to</button>

//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={() => setAnchorEl(null)}>
//             <MenuItem className='' onClick={() => handleSelectUser(' All')}> Public </MenuItem>
//           </Menu>  

      
//         </div>
//       </div>
//     </>
//   );
// };

// export default Template;


// import React, { useState } from 'react';
// import '../../admin/Template/Template.css';
// import Navbar from '../../../Pages/admin/Navbar/Navbar';
// import { Menu, MenuItem } from '@mui/material';
// import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const Template = () => {
//   const [update, setUpdated] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [sharedUser, setSharedUser] = useState('');
//   const [items, setItems] = useState([
//     { description: 'Daily ClockIn', type: 'yesNo', comments: '' },
//     { description: 'Monday Meeting', type: 'yesNo', comments: '' },
//     { description: 'Workdone email', type: 'yesNo', comments: '' },
//     { description: 'Daily Clockout', type: 'yesNo', comments: '' },
//     { description: 'No of tasks completed', type: 'input', comments: '' }
//   ]);

//   const [showOptions, setShowOptions] = useState(Array(items.length).fill(false));
//   const [currentTypes, setCurrentTypes] = useState(Array(items.length).fill(''));

//   const handleUpdate = () => {
//     setUpdated(true);
//     setTimeout(() => setUpdated(false), 3000);
//   };

//   const handleShareClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleSelectUser = (user) => {
//     setAnchorEl(null);
//     setSharedUser(user);
//   };

//   const handleAddItem = () => {
//     setItems([...items, { description: '', type: 'yesNo', comments: '' }]);
//     setShowOptions([...showOptions, false]);
//     setCurrentTypes([...currentTypes, '']);
//   };

//   const handleDescriptionChange = (index, event) => {
//     const updatedItems = [...items];
//     updatedItems[index].description = event.target.value;
//     setItems(updatedItems);
//   };

//   const handleCommentsChange = (index, event) => {
//     const updatedItems = [...items];
//     updatedItems[index].comments = event.target.value;
//     setItems(updatedItems);
//   };

//   const handleSelectClick = (index) => {
//     const updatedShowOptions = [...showOptions];
//     updatedShowOptions[index] = !updatedShowOptions[index];
//     setShowOptions(updatedShowOptions);
//   };

//   const handleTypeChange = (index, event) => {
//     const updatedCurrentTypes = [...currentTypes];
//     updatedCurrentTypes[index] = event.target.value;
//     setCurrentTypes(updatedCurrentTypes);
//     // Update item type based on selection
//     const updatedItems = [...items];
//     updatedItems[index].type = event.target.value;
//     setItems(updatedItems);
//   };


  

//   return (
//     <>
//       <div className='dashboard-container'>
//         <Navbar />
//         {update && <div className="alert-message-position">Updated Successfully!</div>}
//         {sharedUser && <div className="alert-message-position">Checklist is shared with {sharedUser}!</div>}

//         <h2 className='template'>Daily Checklist</h2>
//         <button className='items-position' onClick={handleAddItem}>Add Items</button>

//         <div className='back-position'>
//           <table className='template-position'>
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 <th>Checklist Items</th>
//                 <th>Type</th>
//                 <th>Comments</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}.</td>

//                   <td>
//                     <input
//                       type="text"
//                       value={item.description}
//                       onChange={(event) => handleDescriptionChange(index, event)}
//                       placeholder="Enter item description"
//                     />
//                   </td>

//                   {/* <td onClick={() => handleSelectClick(index)} style={{ cursor: 'pointer', color: 'blue' }}>
//                     Select
//                     {showOptions[index] && (
//                       <div>
//                         <select value={currentTypes[index]} onChange={(event) => handleTypeChange(index, event)}>
//                           <option value="">Select an option</option>
//                           <option value="yesNo">Yes/No</option>
//                           <option value="input">Input</option>
//                         </select>
//                         {currentTypes[index] === 'yesNo' && (
//                           <div>
//                             <label>
//                               <input type="radio" value="Yes" name={`yesNo-${index}`} /> Yes
//                             </label>
//                             <label>
//                               <input type="radio" value="No" name={`yesNo-${index}`} /> No
//                             </label>
//                           </div>
//                         )}
//                         {currentTypes[index] === 'input' && (
//                           <input
//                             type="text"
//                             placeholder="Enter a value"
//                             value={item.comments}
//                             onChange={(event) => handleCommentsChange(index, event)}
//                           />
//                         )}
//                       </div>
//                     )}
//                   </td> */}

//                    <div onClick={handleSelectClick} style={{ cursor: 'pointer', fontWeight: 'bold' }}>  </div>

//       {showOptions && (
//         <div>
//           <select value={type} onChange={handleTypeChange}>
//             <option value="">Select an option</option>
//             <option value="yesNo">Yes/No</option>
//             <option value="input">Input</option>
//           </select>

//           {type === 'yesNo' ? (
//             <div>
//               <label>
//                 <input type="radio" value="Yes" name="yesNo" /> Yes
//               </label>
//               <label>
//                 <input type="radio" value="No" name="yesNo" /> No
//               </label>
//             </div>
//           ) : type === 'input' ? (
//             <input type="text" placeholder="Enter a value" />
//           ) : null}
//         </div>
//       )} 

//                   <td>
//                     <textarea
//                       value={item.comments}
//                       onChange={(event) => handleCommentsChange(index, event)}
//                       placeholder="Add comments"
//                     />
//                   </td>
//                   <td>
//                     <button><FontAwesomeIcon icon={faPen} /></button>
//                     <button><FontAwesomeIcon icon={faTrash} /></button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className='same-line'>
//           <button>Date <input type='date' /></button>
//           <button onClick={handleUpdate}>Save</button>
//           <button onClick={handleShareClick}>Share to</button>

//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={() => setAnchorEl(null)}>
//             <MenuItem onClick={() => handleSelectUser('All')}>Public</MenuItem>
//           </Menu>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Template;



// import React, { useState } from 'react';
// import '../../admin/Template/Template.css';
// import Navbar from '../../../Pages/admin/Navbar/Navbar';
// import { Menu, MenuItem } from '@mui/material';
// import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const Template = () => {
//   const [update, setUpdated] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [sharedUser, setSharedUser] = useState('');
//   const [items, setItems] = useState([
//     { description: 'Daily ClockIn', type: 'yesNo', comments: '' },
//     { description: 'Monday Meeting', type: 'yesNo', comments: '' },
//     { description: 'Workdone email', type: 'yesNo', comments: '' },
//     { description: 'Daily Clockout', type: 'yesNo', comments: '' },
//     { description: 'No of tasks completed', type: 'input', comments: '' }
//   ]);

//   const [showOptions, setShowOptions] = useState(Array(items.length).fill(false));
//   const [currentTypes, setCurrentTypes] = useState(Array(items.length).fill(''));

//   const handleUpdate = () => {
//     setUpdated(true);
//     setTimeout(() => setUpdated(false), 3000);
//   };

//   const handleShareClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleSelectUser = (user) => {
//     setAnchorEl(null);
//     setSharedUser(user);
//   };

//   const handleAddItem = () => {
//     setItems([...items, { description: '', type: 'yesNo', comments: '' }]);
//     setShowOptions([...showOptions, false]);
//     setCurrentTypes([...currentTypes, '']);
//   };

//   const handleDescriptionChange = (index, event) => {
//     const updatedItems = [...items];
//     updatedItems[index].description = event.target.value;
//     setItems(updatedItems);
//   };

//   const handleCommentsChange = (index, event) => {
//     const updatedItems = [...items];
//     updatedItems[index].comments = event.target.value;
//     setItems(updatedItems);
//   };

//   const handleSelectClick = (index) => {
//     const updatedShowOptions = [...showOptions];
//     updatedShowOptions[index] = !updatedShowOptions[index];
//     setShowOptions(updatedShowOptions);
//   };

//   const handleTypeChange = (index, event) => {
//     const updatedCurrentTypes = [...currentTypes];
//     updatedCurrentTypes[index] = event.target.value;
//     setCurrentTypes(updatedCurrentTypes);

//     // Update item type based on selection
//     const updatedItems = [...items];
//     updatedItems[index].type = event.target.value;
//     setItems(updatedItems);
//   };

//   return (
//     <>
//       <div className='dashboard-container'>
//         <Navbar />
//         {update && <div className="alert-message-position">Updated Successfully!</div>}
//         {sharedUser && <div className="alert-message-position">Checklist is shared with {sharedUser}!</div>}

//         <h2 className='template'>Daily Checklist</h2>
//         <button className='items-position' onClick={handleAddItem}>Add Items</button>

//         <div className='back-position'>
//           <table className='template-position'>
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 <th>Checklist Items</th>
//                 <th style={{width:'15rem'}}>Type</th>
//                 <th>Comments</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}.</td>

//                   <td>
//                     <input
//                       type="text"
//                       value={item.description}
//                       onChange={(event) => handleDescriptionChange(index, event)}
//                       placeholder="Enter item description"
//                     />
//                   </td>

//                   <td>
//                     <div onClick={() => handleSelectClick(index)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
//                     select the type
//                     </div>

//                     {showOptions[index] && (
//                       <div>
//                         <select value={currentTypes[index]} onChange={(event) => handleTypeChange(index, event)}>
//                         <option value="">Select</option>
//                           <option value="yesNo">Yes/No</option>
//                           <option value="input">Input</option>
//                         </select>

//                         {currentTypes[index] === 'yesNo' && (
//                           <div>
//                             <label>
//                               <input type="radio" value="Yes" name={`yesNo-${index}`} /> Yes
//                             </label>
//                             <label>
//                               <input type="radio" value="No" name={`yesNo-${index}`} /> No
//                             </label>
//                           </div>
//                         )}

//                         {currentTypes[index] === 'input' && (
//                           <input
//                             type="text"
//                             placeholder="Enter a value"
//                             value={item.comments}
//                             onChange={(event) => handleCommentsChange(index, event)}
//                           />
//                         )}
//                       </div>
//                     )}
//                   </td>

//                   <td>
//                     <textarea
//                       value={item.comments}
//                       onChange={(event) => handleCommentsChange(index, event)}
//                       placeholder="Add comments"
//                     />
//                   </td>
//                   <td>
//                     <button><FontAwesomeIcon icon={faPen} /></button>
//                     <button><FontAwesomeIcon icon={faTrash} /></button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div style={{textAlign:'center'}}> Choose</div>

//         <div className='same-line'>
//           <button>Date <input type='date' /></button>
//           <button onClick={handleUpdate}>Save</button>
//           <button onClick={handleShareClick}>Share to</button>

//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={() => setAnchorEl(null)}>
//             <MenuItem onClick={() => handleSelectUser('All')}>Public</MenuItem>
//           </Menu>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Template;


// import React, { useState } from 'react';
// import '../../admin/Template/Template.css';
// import Navbar from '../../../Pages/admin/Navbar/Navbar';
// import { Menu, MenuItem } from '@mui/material';
// import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const Template = () => {
//   const [update, setUpdated] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [sharedUser, setSharedUser] = useState('');
//   const [items, setItems] = useState([
//     { description: 'Daily ClockIn', type: '', comments: '' },
//     { description: 'Monday Meeting', type: '', comments: '' },
//     { description: 'Workdone email', type: '', comments: '' },
//     { description: 'Daily Clockout', type: '', comments: '' },
//     { description: 'No of tasks completed', type: '', comments: '' }
//   ]);
//   const [showOptions, setShowOptions] = useState(Array(items.length).fill(false));

//   const handleUpdate = () => {
//     setUpdated(true);
//     setTimeout(() => setUpdated(false), 3000);
//   };

//   const handleShareClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleSelectUser = (user) => {
//     setAnchorEl(null);
//     setSharedUser(user);
//   };

//   const handleAddItem = () => {
//     setItems([...items, { description: '', type: '', comments: '' }]);
//     setShowOptions([...showOptions, false]);
//   };

//   const handleDescriptionChange = (index, event) => {
//     const updatedItems = [...items];
//     updatedItems[index].description = event.target.value;
//     setItems(updatedItems);
//   };

//   const handleCommentsChange = (index, event) => {
//     const updatedItems = [...items];
//     updatedItems[index].comments = event.target.value;
//     setItems(updatedItems);
//   };

//   const handleChooseClick = (index) => {
//     const updatedShowOptions = [...showOptions];
//     updatedShowOptions[index] = !updatedShowOptions[index];
//     setShowOptions(updatedShowOptions);
//   };

//   const handleTypeChange = (index, type) => {
//     const updatedItems = [...items];
//     updatedItems[index].type = type;
//     setItems(updatedItems);
//     setShowOptions(prev => prev.map((_, i) => i === index ? false : _)); // Close options after selection
//   };

//   return (
//     <>
//       <div className='dashboard-container'>
//         <Navbar />
//         {update && <div className="alert-message-position">Updated Successfully!</div>}
//         {sharedUser && <div className="alert-message-position">Checklist is shared with {sharedUser}!</div>}

//         <h2 className='template'>Daily Checklist</h2>
//         <button className='items-position' onClick={handleAddItem}>Add Items</button>

//         <div className='back-position'>
//           <table className='template-position'>
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 <th>Checklist Items</th>
//                 <th style={{ width: '15rem' }}>Type</th>
//                 <th>Comments</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}.</td>

//                   <td>
//                     <input
//                       type="text"
//                       value={item.description}
//                       onChange={(event) => handleDescriptionChange(index, event)}
//                       placeholder="Enter item description"
//                     />
//                   </td>

//                   <td>
//                     <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => handleChooseClick(index)}>
//                       select the type
//                     </div>
//                     {showOptions[index] && (
//                       <select>
                        
//                         <option  onClick={() => handleTypeChange(index, 'yesNo')}>Yes/No</option>
//                         <option onClick={() => handleTypeChange(index, 'input')}>Enter a number</option>
//                       </select>
//                     )}
//                     {item.type === 'yesNo' && (
//                       <div>
//                         <label>
//                           <input type="radio" value="Yes" name={`yesNo-${index}`} /> Yes
//                         </label>
//                         <label>
//                           <input type="radio" value="No" name={`yesNo-${index}`} /> No
//                         </label>
//                       </div>
//                     )}
//                     {item.type === 'input' && (
//                       <input
//                         type="number"
//                         placeholder="Enter a number"
//                         value={item.comments}
//                         onChange={(event) => handleCommentsChange(index, event)}
//                       />
//                     )}
//                   </td>

//                   <td>
//                     <textarea
//                       value={item.comments}
//                       onChange={(event) => handleCommentsChange(index, event)}
//                       placeholder="Add comments"
//                     />
//                   </td>
//                   <td>
//                     <button><FontAwesomeIcon icon={faPen} /></button>
//                     <button><FontAwesomeIcon icon={faTrash} /></button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className='same-line'>
//           <button>Date <input type='date' /></button>
//           <button onClick={handleUpdate}>Save</button>
//           <button onClick={handleShareClick}>Share to</button>

//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={() => setAnchorEl(null)}>
//             <MenuItem onClick={() => handleSelectUser('All')}>Public</MenuItem>
//           </Menu>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Template;


import React, { useState } from 'react';
import '../../admin/Template/Template.css';
import Navbar from '../../../Pages/admin/Navbar/Navbar';
import { Menu, MenuItem } from '@mui/material';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Template = () => {
  const [update, setUpdated] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sharedUser, setSharedUser] = useState('');
  const [items, setItems] = useState([
    { description: 'Daily ClockIn', type: '', comments: '' },
    { description: 'Monday Meeting', type: '', comments: '' },
    { description: 'Workdone email', type: '', comments: '' },
    { description: 'Daily Clockout', type: '', comments: '' },
    { description: 'No of tasks completed', type: '', comments: '' }
  ]);
  const [showOptions, setShowOptions] = useState(Array(items.length).fill(false));

  const handleUpdate = () => {
    setUpdated(true);
    setTimeout(() => setUpdated(false), 3000);
  };

  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectUser = (user) => {
    setAnchorEl(null);
    setSharedUser(user);
  };

  const handleAddItem = () => {
    setItems([...items, { description: '', type: '', comments: '' }]);
    setShowOptions([...showOptions, false]);
  };

  const handleDescriptionChange = (index, event) => {
    const updatedItems = [...items];
    updatedItems[index].description = event.target.value;
    setItems(updatedItems);
  };

  const handleCommentsChange = (index, event) => {
    const updatedItems = [...items];
    updatedItems[index].comments = event.target.value;
    setItems(updatedItems);
  };

  const handleChooseClick = (index) => {
    const updatedShowOptions = [...showOptions];
    updatedShowOptions[index] = !updatedShowOptions[index];
    setShowOptions(updatedShowOptions);
  };

  const handleTypeChange = (index, type) => {
    const updatedItems = [...items];
    updatedItems[index].type = type;
    setItems(updatedItems);
    setShowOptions(prev => prev.map((_, i) => i === index ? false : _)); 
  };

  return (
    <>
      <div className='dashboard-container'>
        <Navbar />
        {update && <div className="alert-message-position">Updated Successfully!</div>}
        {sharedUser && <div className="alert-message-position">Checklist is shared with {sharedUser}!</div>}

        <h2 className='template'>Daily Checklist</h2>
        <button className='items-position' onClick={handleAddItem}>Add Items</button>

        <div className='back-position'>
          <table className='template-position'>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Checklist Items</th>
                <th style={{ width: '15rem' }}>Type</th>
                <th>Comments</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}.</td>

                  <td>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(event) => handleDescriptionChange(index, event)}
                      placeholder="Enter item description"
                    />
                  </td>

                  <td>
                    <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => handleChooseClick(index)}>
                      Select the type
                    </div>
                    {showOptions[index] && (
                      <div>
                        <button onClick={() => handleTypeChange(index, 'yesNo')}>Yes/No</button>
                        <button onClick={() => handleTypeChange(index, 'input')}>Enter a number</button>
                      </div>
                    )}
                    {item.type === 'yesNo' && (
                      <div>
                        <label>
                          <input type="radio" value="Yes" name={`yesNo-${index}`} /> Yes
                        </label>
                        <label>
                          <input type="radio" value="No" name={`yesNo-${index}`} /> No
                        </label>
                      </div>
                    )}
                    {item.type === 'input' && (
                      <input
                        type="number"
                        placeholder="Enter a number"
                        value={item.comments}
                        onChange={(event) => handleCommentsChange(index, event)}
                      />
                    )}
                  </td>

                  <td>
                    <textarea
                      value={item.comments}
                      onChange={(event) => handleCommentsChange(index, event)}
                      placeholder="Add comments"
                    />
                  </td>
                  <td>
                    <button><FontAwesomeIcon icon={faPen} /></button>
                    <button><FontAwesomeIcon icon={faTrash} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='same-line'>
          <button>Date <input type='date' /></button>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={handleShareClick}>Share to</button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={() => handleSelectUser('All')}>Public</MenuItem>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default Template;




