
import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Complete.css";

function Complete() {
  const completedChecklists = [
    {
      title: "Checklist 1",
      completionDate: "25-09-2024",
      priorityLevel: "High",
    },
    {
      title: "Checklist 2",
      completionDate: "23-09-2024",
      priorityLevel: "Medium",
    },
  ];

  return (
    <div className="complete-container">
      <Navbar />
      <div className="main-card">
        <h1 className="header-title">Completed Checklists</h1>

        <div className="filter-card">
          <div className="filter-buttons">
            <button>All</button>
            <button>Last 7 Days</button>
            <button>Last 30 Days</button>
          </div>
          <br />
          <div className="sort-dropdown">
            <label>Sort by:</label>
            <select>
              <option>Date Completed</option>
              <option>Checklist Name</option>
              <option>Duration</option>
            </select>
            <button className="apply-button">Apply</button>
          </div>
        </div>

        <div className="checklist-cards">
          {completedChecklists.map((checklist, index) => (
            <div className="checklist-card" key={index}>
              <span className="completed-badge">Completed</span>
              <br />
              <h2 className="checklist-title">{checklist.title}</h2>
              <p className="completion-date">
                Completed on: {checklist.completionDate}
              </p>
              <p className="task-summary">{checklist.tasksCompleted}</p>{" "}
              
              <p className="priority-level">
                Priority Level: {checklist.priorityLevel}
              </p>{" "}
          
              <div className="card-buttons">
               
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Complete;
