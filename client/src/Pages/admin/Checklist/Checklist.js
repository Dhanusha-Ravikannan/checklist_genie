import React, { useState } from 'react';
import '../../admin/Checklist/Checklist.css';
import Navbar from '../../../Pages/admin/Navbar/Navbar';


const Checklist = () => {
  const [update] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [priorityVisible, setPriorityVisible] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [newItem, setNewItem] = useState(''); 
  const [newDescription, setNewDescription] = useState(''); 

 

  const handleShared = () => {
    setDropdownVisible(true);
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setDropdownVisible(false);
    console.log(`Assigned to: ${user}`);
  };

  const handlePriorityClick = () => {
    setPriorityVisible(!priorityVisible);
  };

  const handleSelectPriority = (priority) => {
    setSelectedPriority(priority);
    setPriorityVisible(false);
    console.log(`Priority selected: ${priority}`);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    console.log(`Selected date: ${e.target.value}`);
  };

  const users = ['Public'," Full Stack Developers"," Power BI Developers",'Salesforce','Sales', 'Ashwin', 'Amal', 'Swetha', 'Krishna', 'Kiran', 'Devaraj', 'Saranya', 'Hari', 'Aswathi', 'Selva'];
  const priorities = ['High', 'Medium', 'Low'];

  
  const handleAddItemsClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveNewItem = () => {
    console.log(`New Item: ${newItem}, Description: ${newDescription}`);
    
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='dashboard-container'>
        <Navbar />
        {update && <div className="alert-message-position">Saved Successfully!</div>}

        <div className='content'>
          <div className='ready-check'>Checklist Name</div>
          
          <button className='add-position' onClick={handleAddItemsClick}>Add Items</button> 
          <div>
            <br />
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
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Checklist Name</h2>
              <div className='first-fill'>
            <button>
              Date:{' '}
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="date-picker"
              />
            </button>

            <button onClick={handlePriorityClick} className="priority-label">
              Priority: {selectedPriority || 'Select'}
            </button>
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
          </div>
          <br/> 
          <div className='input-field'> 
              <label>Item Name:</label>
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
              />
              <label>Description:</label>
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
              <label> Comments:</label>
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
              </div>
              <label>  <button> Edit  </button>  </label>
             <br/>

              <button onClick={handleSaveNewItem}>Save</button>
              <button >  <p onClick={handleShared}>Assign to</p></button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Checklist;

