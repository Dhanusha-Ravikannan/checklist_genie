
// import React, { useState } from "react";
// import { Pie } from "react-chartjs-2";
// import { Button } from "@mui/material";
// import "./Assigned.css";
// import Navbar from "../Navbar/Navbar";
// import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
// import { useNavigate } from "react-router-dom";

// Chart.register(ArcElement, Tooltip, Legend);

// function Priority() {
//   const [tasks] = useState([
//     {
//       name: "Checklist 1",
//       Date: "26-09-2024",
//       priority: "High",
//       status: "To Do",
//     },
//     {
//       name: "Checklist 2",
//       Date: "26-09-2024",
//       priority: "Medium",
//       status: "In Progress",
//     },
//     {
//       name: "Checklist 3",
//       Date: "26-09-2024",
//       priority: "Low",
//       status: "Completed",
//     },
//   ]);

//   const [checkedTasks, setCheckedTasks] = useState(
//     Array(tasks.length).fill(false)
//   );

//   const taskSummary = {
//     totalTasks: tasks.length,
//     highPriority: tasks.filter((task) => task.priority === "High").length,
//     mediumPriority: tasks.filter((task) => task.priority === "Medium").length,
//     lowPriority: tasks.filter((task) => task.priority === "Low").length,
//     toDo: tasks.filter((task) => task.status === "To Do").length,
//     inProgress: tasks.filter((task) => task.status === "In Progress").length,
//     completed: tasks.filter((task) => task.status === "Completed").length,
//   };

//   const priorityData = {
//     labels: ["High", "Medium", "Low"],
//     datasets: [
//       {
//         data: [
//           taskSummary.highPriority,
//           taskSummary.mediumPriority,
//           taskSummary.lowPriority,
//         ],
//         backgroundColor: ["#ff4d4d", "#ffa500", "#4caf50"],
//         hoverBackgroundColor: ["#e60000", "#cc8500", "#388e3c"],
//       },
//     ],
//   };

//   const handleCheckboxChange = (index) => {
//     const updatedCheckedTasks = [...checkedTasks];
//     updatedCheckedTasks[index] = !updatedCheckedTasks[index];
//     setCheckedTasks(updatedCheckedTasks);
//   };

//   const handleSubmit = () => {
//     if (checkedTasks.some((checked) => checked)) {
//       alert("Checklist completed successfully!");
//     } else {
//       alert("Please fill the checklist level before submitting.");
//     }
//   };

//   const navigate = useNavigate();

//   return (
//     <>
//       <div>
//         <Navbar />
//       </div>
//       <div className="priority-container">
//         <div className="overview-widgets">
//           <div className="widget">
//             <h3>Checklist Summary</h3>
//             <br />
//             <p>Total Checklist: {taskSummary.totalTasks}</p>
//             <p>High Priority: {taskSummary.highPriority}</p>
//             <p>Medium Priority: {taskSummary.mediumPriority}</p>
//             <p>Low Priority: {taskSummary.lowPriority}</p>
//           </div>
//           <div className="widget">
//             <h3>Upcoming Deadlines</h3>
//             <br />
//             <p>Checklist Due Today: 0</p>
//             <p>Checklist Due This Week: 0</p>
//           </div>
//           <div className="widget">
//             <h3>Priority Distribution</h3>
//             <br />
//             <div className="chart">
//               <Pie data={priorityData} />
//             </div>
//           </div>
//           <div className="widget">
//             <h3>Status Overview</h3>
//             <br />
//             <p>To Do: {taskSummary.toDo}</p>
//             <p>In Progress: {taskSummary.inProgress}</p>
//             <p>Completed: {taskSummary.completed}</p>
//           </div>
//         </div>

//         <div className="task-list">
//           <div className="task-table-header">
//             <div>Date</div>
//             <div>Checklist Name</div>
//             <div>Priority</div>
//             <div>Status</div>
//             <div>Checklist Level</div>
//             <div>Actions</div>
//           </div>
//           {tasks.map((task, index) => (
//             <div key={index} className="task-row">
//               <div>{task.Date}</div>
//               <div>{task.name}</div>
//               <div className={`priority-level ${task.priority.toLowerCase()}`}>
//                 {task.priority}
//               </div>
//               <div>{task.status}</div>
//               <div className="checklist-level">
//                 <input
//                   type="checkbox"
//                   checked={checkedTasks[index]}
//                   onChange={() => handleCheckboxChange(index)}
//                 />
//               </div>
//               <div className="task-actions">
//                 <Button
//                   variant="contained"
//                   style={{ backgroundColor: "#25274D", color: "white" }}
//                   onClick={() => navigate("/user/view")}
//                 >
//                   View
//                 </Button>
//                 <Button
//                   variant="contained"
//                   style={{ backgroundColor: "#25274D", color: "white" }}
//                   onClick={handleSubmit}
//                 >
//                   Submit
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Priority;

import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Button, TextField } from "@mui/material";
import "./Assigned.css";
import Navbar from "../Navbar/Navbar";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";

Chart.register(ArcElement, Tooltip, Legend);

function Priority() {
  const [tasks] = useState([
    {
      name: "Checklist 1",
      Date: "26-09-2024",
      priority: "High",
      status: "To Do",
    },
    {
      name: "Checklist 2",
      Date: "26-09-2024",
      priority: "Medium",
      status: "In Progress",
    },
    {
      name: "Checklist 3",
      Date: "26-09-2024",
      priority: "Low",
      status: "Completed",
    },
  ]);

  const [checkedTasks, setCheckedTasks] = useState(
    Array(tasks.length).fill(false)
  );
  const [searchTerm, setSearchTerm] = useState("");

  const taskSummary = {
    totalTasks: tasks.length,
    highPriority: tasks.filter((task) => task.priority === "High").length,
    mediumPriority: tasks.filter((task) => task.priority === "Medium").length,
    lowPriority: tasks.filter((task) => task.priority === "Low").length,
    toDo: tasks.filter((task) => task.status === "To Do").length,
    inProgress: tasks.filter((task) => task.status === "In Progress").length,
    completed: tasks.filter((task) => task.status === "Completed").length,
  };

  const priorityData = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        data: [
          taskSummary.highPriority,
          taskSummary.mediumPriority,
          taskSummary.lowPriority,
        ],
        backgroundColor: ["#ff4d4d", "#ffa500", "#4caf50"],
        hoverBackgroundColor: ["#e60000", "#cc8500", "#388e3c"],
      },
    ],
  };

  const handleCheckboxChange = (index) => {
    const updatedCheckedTasks = [...checkedTasks];
    updatedCheckedTasks[index] = !updatedCheckedTasks[index];
    setCheckedTasks(updatedCheckedTasks);
  };

  const handleSubmit = () => {
    if (checkedTasks.some((checked) => checked)) {
      alert("Checklist completed successfully!");
    } else {
      alert("Please fill the checklist level before submitting.");
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigate = useNavigate();

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="priority-container">
        <div className="overview-widgets">
          <div className="widget">
            <h3>Checklist Summary</h3>
            <br />
            <p>Total Checklist: {taskSummary.totalTasks}</p>
            <p>High Priority: {taskSummary.highPriority}</p>
            <p>Medium Priority: {taskSummary.mediumPriority}</p>
            <p>Low Priority: {taskSummary.lowPriority}</p>
          </div>
          <div className="widget">
            <h3>Upcoming Deadlines</h3>
            <br />
            <p>Checklist Due Today: 0</p>
            <p>Checklist Due This Week: 0</p>
          </div>
          <div className="widget">
            <h3>Priority Distribution</h3>
            <br />
            <div className="chart">
              <Pie data={priorityData} />
            </div>
          </div>
          <div className="widget">
            <h3>Status Overview</h3>
            <br />
            <p>To Do: {taskSummary.toDo}</p>
            <p>In Progress: {taskSummary.inProgress}</p>
            <p>Completed: {taskSummary.completed}</p>
          </div>
        </div>

      
        <div className="search-bar" style={{width:"30%"}}>
          <TextField
            placeholder="Browse Checklist"
            variant="outlined"
            fullWidth
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <br></br>

        <div className="task-list">
          <div className="task-table-header">
            <div>Date</div>
            <div>Checklist Name</div>
            <div>Priority</div>
            <div>Status</div>
            <div>Checklist Level</div>
            <div>Actions</div>
          </div>
          {filteredTasks.map((task, index) => (
            <div key={index} className="task-row">
              <div>{task.Date}</div>
              <div>{task.name}</div>
              <div className={`priority-level ${task.priority.toLowerCase()}`}>
                {task.priority}
              </div>
              <div>{task.status}</div>
              <div className="checklist-level">
                <input
                  type="checkbox"
                  checked={checkedTasks[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
              </div>
              <div className="task-actions">
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#25274D", color: "white" }}
                  onClick={() => navigate("/user/view")}
                >
                  View
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#25274D", color: "white" }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Priority;
