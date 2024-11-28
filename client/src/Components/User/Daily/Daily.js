import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./Daily.css";

function Assigned({ onClose }) {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Daily clock in", answer: "", comment: "" },
    { id: 2, name: "Monday meeting", answer: "", comment: "" },
    { id: 3, name: "Testing", answer: "", comment: "" },
    { id: 4, name: "Workdone email", answer: "", comment: "" },
    { id: 5, name: "Clock out", answer: "", comment: "" },
  ]);

  const [numberOfTasksWorked, setNumberOfTasksWorked] = useState("");
  const [tasksWorkedComment, setTasksWorkedComment] = useState("");

  const handleRadioChange = (id, value) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, answer: value } : task
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
    const allFilled = tasks.every((task) => task.answer !== "");
    const validNumber = numberOfTasksWorked !== "";

    if (!allFilled || !validNumber) {
      alert(
        "Please fill all the checklist items and the number of tasks worked."
      );
    } else {
      alert("Checklist completed successfully");
      onClose();
    }
  };

  return (
    <div className="assigned-container">
      <Card className="assigned-card">
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
                      <div className="radio-group">
                        <label>
                          <input
                            type="radio"
                            name={`task-${task.id}`}
                            value="Yes"
                            checked={task.answer === "Yes"}
                            onChange={() => handleRadioChange(task.id, "Yes")}
                          />{" "}
                          Yes
                        </label>
                        <label>
                          <input
                            type="radio"
                            name={`task-${task.id}`}
                            value="No"
                            checked={task.answer === "No"}
                            onChange={() => handleRadioChange(task.id, "No")}
                          />{" "}
                          No
                        </label>
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
                        placeholder="Optional"
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
                      placeholder="Optional"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <Button
              style={{ backgroundColor: "#25274D" }}
              variant="contained"
              color="success"
              className="submit-button"
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



