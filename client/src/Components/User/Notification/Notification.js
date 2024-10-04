import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Notification.css"; 


function Notification() {
  return (
    <div className="notification-page">
      <Navbar />
      <div className="notification-card">
        <div className="notification-header">
          <h2>Notifications</h2>
          <input type="text" className="search-bar" placeholder="Search..." />
        </div>
        <div className="notification-list">
          <NotificationItem
            icon="📋"
            title="Assigned Checklists"
            text="You’ve been assigned a new checklist: 'Prepare a report '."
            time="2 hours ago"
          />
          <NotificationItem
            icon="⏰"
            title="Overdue Alerts"
            text="Checklist 'Complete checklist Review' is overdue. Please complete it ASAP."
            time="15 minutes ago"
          />
          <NotificationItem
            icon="💬"
            title="Comments"
            text="Admin commented on 'Complete Decision-coach Analysis': 'Please review the latest figures.'"
            time="30 minutes ago"
          />
          <NotificationItem
            icon="🔔"
            title="Alerts"
            text="You have a system alert about upcoming checklist."
            time="1 day ago"
          />
        </div>
      </div>
    </div>
  );
}


const NotificationItem = ({ icon, title, text, time }) => (
  <div className="notification-item">
    <span className="notification-icon">{icon}</span>
    <div className="notification-details">
      <strong>{title}</strong>
      <p>{text}</p>
      <span className="notification-time">{time}</span>
    </div>
    <div className="notification-actions">
      <button>View</button>
     
    </div>
  </div>
);

export default Notification;

