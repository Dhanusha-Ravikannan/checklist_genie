
import React from "react";
import Navbar from "../Navbar/Navbar";
import "./View.css";
import { useNavigate } from "react-router-dom"; 

function View() {
  const navigate = useNavigate(); 

  return (
    <div className="view-container">
      <Navbar />
      <div className="card">
        <h2 style={{textAlign:"center"}}>Checklist Description</h2>
        <table className="checklist-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>SI.No</th>
              <th>Checklist Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>26-09-2024</td>
              <td>1</td>
              <td>Checklist 1</td>
              <td>Fix the bug</td>
            </tr>
          </tbody>
        </table>
        <button
          className="back-button"
          onClick={() => navigate("/user/priority")}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default View;
