
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./Daily.css";

function Assigned() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Daily clock in", yes: false, no: false, comment: "" },
    { id: 2, name: "Monday meeting", yes: false, no: false, comment: "" },
    { id: 3, name: "Testing", yes: false, no: false, comment: "" },
    { id: 4, name: "Workdone email", yes: false, no: false, comment: "" },
    { id: 5, name: "Clock out", yes: false, no: false, comment: "" },
  ]);

  const [numberOfTasksWorked, setNumberOfTasksWorked] = useState("");
  const [tasksWorkedComment, setTasksWorkedComment] = useState("");

  const handleCheckboxChange = (id, type) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              yes: type === "yes",
              no: type === "no",
            }
          : task
      )
    );
  };

  const handleCommentChange = (id, value) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, comment: value } : task
      )
    );
  };

  const handleNumberOfTasksChange = (value) => {
    if (value === "") {
      setNumberOfTasksWorked("");
    } else {
      const newValue = Math.max(0, Number(value));
      setNumberOfTasksWorked(newValue);
    }
  };

  const handleSubmit = () => {
    alert("Checklist completed successfully");
  };

  return (
    <div className="assigned-containerr">
      <Navbar />
      <Card className="assigned-cardd">
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            className="card-title"
            align="center"
          >
            Daily Checklist
          </Typography>
          <br />

          <div className="task-table-container">
            <table className="task-table">
              <thead>
                <tr>
                  <th>SI.No</th>
                  <th>CheckList</th>
                  <th>Type</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={task.id}>
                    <td>{index + 1}</td>
                    <td>{task.name}</td>
                    <td>
                      <div className="checkbox-group">
                        <input
                          type="checkbox"
                          checked={task.yes}
                          onChange={() => handleCheckboxChange(task.id, "yes")}
                        />{" "}
                        Yes
                        <input
                          type="checkbox"
                          style={{ marginLeft: "10px" }}
                          checked={task.no}
                          onChange={() => handleCheckboxChange(task.id, "no")}
                        />{" "}
                        No
                      </div>
                    </td>
                    <td>
                      <TextField
                        variant="outlined"
                        size="small"
                        value={task.comment}
                        onChange={(e) =>
                          handleCommentChange(task.id, e.target.value)
                        }
                        placeholder="Add comment"
                      />
                    </td>
                  </tr>
                ))}

                <tr>
                  <td>{tasks.length + 1}</td>
                  <td>No of tasks worked </td>
                  <td>
                    <TextField
                      variant="outlined"
                      size="small"
                      type="number"
                      value={numberOfTasksWorked}
                      onChange={(e) =>
                        handleNumberOfTasksChange(e.target.value)
                      }
                      placeholder="Enter number"
                    />
                  </td>
                  <td>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={tasksWorkedComment}
                      onChange={(e) => setTasksWorkedComment(e.target.value)}
                      placeholder="Add comment"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <Button
              style={{ backgroundColor: "#25274D" }}
              variant="contained"
              color="success"
              className="submit-buttonn"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Assigned;
