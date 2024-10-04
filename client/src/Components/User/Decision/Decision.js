// import React, { useState } from "react";
// import "./Decision.css"; 

// function Decision() {
//   const [response1, setResponse1] = useState("");
//   const [comments1, setComments1] = useState("");
//   const [isChecked1, setIsChecked1] = useState(false);
//   const [response2, setResponse2] = useState("");
//   const [comments2, setComments2] = useState("");
//   const [isChecked2, setIsChecked2] = useState(false);
//   const [isUpdated, setIsUpdated] = useState(false);

//   const handleResponseChange1 = (event) => {
//     setResponse1(event.target.value);
//   };

//   const handleResponseChange2 = (event) => {
//     setResponse2(event.target.value);
//   };

//   const handleCheckboxChange1 = () => {
//     if (!response1) {
//       alert("Please fill the response for item 1 first");
//       return;
//     }
//     setIsChecked1((prev) => !prev);
//     alert("Checklist item 1 completed successfully");
//   };

//   const handleCheckboxChange2 = () => {
//     if (!response2) {
//       alert("Please fill the response for item 2 first");
//       return;
//     }
//     setIsChecked2((prev) => !prev);
//     alert("Checklist item 2 completed successfully");
//   };

//   const handleUpdate = () => {
//     if (!response1 && !response2) {
//       alert("Please fill the response for at least one item");
//       return;
//     }
//     setIsUpdated(true);
//     alert("Checklist updated successfully");
//   };

//   return (
//     <div className="card">
//       <h2>Decision Coach</h2>
//       <table className="checklist-table">
//         <thead>
//           <tr>
//             <th>SI.No</th>
//             <th>Checklist Items</th>
//             <th>Response</th>
//             <th>Comments</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
    
//           <tr>
//             <td>1</td>
//             <td>Testing</td>
//             <td>
//               <div className="radio-group">
//                 <label>
//                   <input
//                     type="radio"
//                     value="yes"
//                     checked={response1 === "yes"}
//                     onChange={handleResponseChange1}
//                   />{" "}
//                   Yes
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     value="no"
//                     checked={response1 === "no"}
//                     onChange={handleResponseChange1}
//                   />{" "}
//                   No
//                 </label>
//               </div>
//             </td>
//             <td>
//               <input
//                 type="text"
//                 value={comments1}
//                 onChange={(e) => setComments1(e.target.value)}
//                 placeholder="Optional Comments"
//               />
//             </td>
//             <td>
//               <span
//                 className={`checkbox-icon ${isChecked1 ? "checked" : ""}`}
//                 onClick={handleCheckboxChange1}
//                 style={{
//                   cursor: response1 ? "pointer" : "not-allowed",
//                   color: response1 ? "black" : "gray",
//                 }}
//               >
//                 {isChecked1 ? "✓" : "✗"}
//               </span>
//             </td>
//           </tr>
          
//           <tr>
//             <td>2</td>
//             <td>Fix the bug</td>
//             <td>
//               <div className="radio-group">
//                 <label>
//                   <input
//                     type="radio"
//                     value="yes"
//                     checked={response2 === "yes"}
//                     onChange={handleResponseChange2}
//                   />{" "}
//                   Yes
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     value="no"
//                     checked={response2 === "no"}
//                     onChange={handleResponseChange2}
//                   />{" "}
//                   No
//                 </label>
//               </div>
//             </td>
//             <td>
//               <input
//                 type="text"
//                 value={comments2}
//                 onChange={(e) => setComments2(e.target.value)}
//                 placeholder="Optional Comments"
//               />
//             </td>
//             <td>
//               <span
//                 className={`checkbox-icon ${isChecked2 ? "checked" : ""}`}
//                 onClick={handleCheckboxChange2}
//                 style={{
//                   cursor: response2 ? "pointer" : "not-allowed",
//                   color: response2 ? "black" : "gray",
//                 }}
//               >
//                 {isChecked2 ? "✓" : "✗"}
//               </span>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//       <button onClick={handleUpdate} className="update-button">
//         Submit
//       </button>
//       {isUpdated && (
//         <div className="update-message">Checklist updated successfully.</div>
//       )}
//     </div>
//   );
// }

// export default Decision;


import React, { useState } from "react";
import "./Decision.css";

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
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={response1}
                  onChange={handleToggle1}
                />
                <span className="slider"></span>
              </label>
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
                <span style={{ color: "green", fontSize: "1.5em" }}>✔️</span>
              )}
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>Fix the bug</td>
            <td>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={response2}
                  onChange={handleToggle2}
                />
                <span className="slider"></span>
              </label>
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
                <span style={{ color: "green", fontSize: "1.5em" }}>✔️</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      {notification && <div className="notification">{notification}</div>}

      {/* Text area description box for additional comments */}
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
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </div>

      <style jsx>{`
        .toggle {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }

        .toggle input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: 0.4s;
          border-radius: 34px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: 0.4s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: #2196f3;
        }

        input:checked + .slider:before {
          transform: translateX(26px);
        }
      `}</style>
    </div>
  );
}

export default Decision;
