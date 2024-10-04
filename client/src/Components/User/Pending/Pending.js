import React from "react";
import "./Pending.css";

function Pending() {
  
  const handleMarkAsComplete = () => {
    alert("Pending Task completed successfully");
  };

  return (
    <>
   
      <div className="pending-container">
        <div className="carddd">
          <div className="headerr">
            <h5 className="pending-title">Pending checklist</h5>
          </div>
          <div className="task-details">
            <div className="task-header">
              <h2 className="task-title">Checklist </h2>
            </div>
            <div className="task-info">
              <p>
                <strong>Due Date:</strong> 09/15/2024
              </p>
              <p>
                <strong>Time:</strong> 3:00 PM
              </p>
              
            </div>
            <div className="task-description">
              <h3 className="section-heading">Description:</h3>
              <p>Complete the pending checklist soon</p>
            </div>
            <div className="task-attachments">
              <h3 className="section-heading">Attachments:</h3>
             
                  <div className="attachment-info">
                    <span>File Name 1</span>
                    <button className="download-btn">Upload</button>
                  </div>
               
<br></br>
                  <div className="attachment-info">
                    <span>File Name 2</span>
                    <button className="download-btn">Upload</button>
                  </div>
                
              
            </div>
            <div className="task-comments">
              <h3 className="section-heading">Comments:</h3>
              <textarea placeholder="Add a comment..."></textarea>
              <button className="add-comment-btn">Add Comment</button>
            </div>
            <div className="task-status-actions">
              <p>
                Status: <span className="status-label">Overdue</span>
              </p>
              <button
                className="mark-complete-btn"
                onClick={handleMarkAsComplete}
              >
                Mark as Complete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pending;
