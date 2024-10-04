import React, { useState } from 'react';
import '../../admin/Tag/Tag.css';
import Navbar from '../../../Pages/admin/Navbar/Navbar'


const Tag = () => {
  const [saved, setSaved] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDelete = () => {
    setDeleted(true);
    setTimeout(() => setDeleted(false), 3000);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };


  return (
    <> 
      <div className='dashboard-container'> 
        <Navbar/>
        <h3 className='tag-pos'>Tags</h3>
        {saved && <div className="alert-message">Saved Successfully!</div>}
        {deleted && <div className="alert-message">Deleted Successfully!</div>}
        <div className='notification-container'>
          <div className="notification-header">
            <h2 className='tag-position'>Tags</h2>
          </div>
          <div className="tag-form">
            <div className="form-row">
              <label>Tag Name</label>
              <input type="text" />
            </div>
            <div className="form-row">
              <label>Description</label>
              <textarea />
            </div>
            <div className="form-row">
              <label>Frequency</label>
              <input type="text" />
            </div>
            <div className="form-row">
              <label>Type</label>
              <input type="text" />
            </div>
            <div className="form-row">
              <label>Applicable Team</label>
              <input type="text" />
            </div>
          </div>
          <div className='del'> 
            <button>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>

        
      </div> 
    </>
  );
}

export default Tag;
