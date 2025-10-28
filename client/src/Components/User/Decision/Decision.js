
import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import "./Decision.css";

const label = { inputProps: { "aria-label": "Switch demo" } };

function Decision() {
  const [response1, setResponse1] = useState(false);
  const [comments1, setComments1] = useState("");
  const [isChecked1, setIsChecked1] = useState(false);
  const [response2, setResponse2] = useState(false);
  const [comments2, setComments2] = useState("");
  const [isChecked2, setIsChecked2] = useState(false);
  const [notification, setNotification] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");

  const handleToggle1 = () => {
    setResponse1((prev) => !prev);
    setIsChecked1((prev) => !prev);
    setNotification(
      !isChecked1 ? "Checklist item 1 submitted successfully!" : ""
    );
  };

  const handleToggle2 = () => {
    setResponse2((prev) => !prev);
    setIsChecked2((prev) => !prev);
    setNotification(
      !isChecked2 ? "Checklist item 2 submitted successfully!" : ""
    );
  };

  const handleSubmit = () => {
    console.log("Submitted Comments: ", additionalComments);
    setAdditionalComments("");
    setNotification("Additional comments submitted successfully!");
  };

  return (
    <div className="card">
      <h2>Decision Coach</h2>
      <table className="checklist-table">
        <thead>
          <tr>
            <th>SI.No</th>
            <th>Checklist Items</th>
            <th>Response</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Testing</td>
            <td>
              <Switch {...label} checked={response1} onChange={handleToggle1} />
            </td>
            <td>
              <input
                type="text"
                value={comments1}
                onChange={(e) => setComments1(e.target.value)}
                placeholder="Optional Comments"
              />
            </td>
            <td>
              {isChecked1 && (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="green"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 19l-7-7 1.41-1.41L9 16.17l12.59-12.59L24 6l-15 15z" />
                </svg>
              )}
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>Fix the bug</td>
            <td>
              <Switch {...label} checked={response2} onChange={handleToggle2} />
            </td>
            <td>
              <input
                type="text"
                value={comments2}
                onChange={(e) => setComments2(e.target.value)}
                placeholder="Optional Comments"
              />
            </td>
            <td>
              {isChecked2 && (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="green"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 19l-7-7 1.41-1.41L9 16.17l12.59-12.59L24 6l-15 15z" />
                </svg>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      {notification && <div className="notification">{notification}</div>}

      <div className="additional-comments">
        <h3>Additional Comments</h3>
        <textarea
          value={additionalComments}
          onChange={(e) => setAdditionalComments(e.target.value)}
          placeholder="Enter additional comments here..."
          rows="4"
          style={{
            width: "100%",
            height: "100px",
            padding: "10px",
            resize: "none",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box",
          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            marginTop: "10px",
            padding: "10px 15px",
            backgroundColor: "#25274D",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Decision;
