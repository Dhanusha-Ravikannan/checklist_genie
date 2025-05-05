import React, { useState } from "react";
import "../../admin/Template/Template.css";
import Navbar from "../../../Pages/admin/Navbar/Navbar";
import { Menu, MenuItem } from "@mui/material";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserNav from '../../../Components/User/Sidebar/Sidebar';
import { useLocation } from "react-router-dom";

const Template = () => {
  const [update, setUpdated] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sharedUser, setSharedUser] = useState("");
  const [items, setItems] = useState([
    { description: "Daily ClockIn", type: "", comments: "" },
    { description: "Monday Meeting", type: "", comments: "" },
    { description: "Workdone email", type: "", comments: "" },
    { description: "Daily Clockout", type: "", comments: "" },
    { description: "No of tasks completed", type: "", comments: "" },
  ]);
  const [showOptions, setShowOptions] = useState(
    Array(items.length).fill(false)
  );
  const location = useLocation();
  const isAdmin = location.pathname.includes("/admin/template");

  const handleUpdate = () => {
    setUpdated(true);
    setTimeout(() => setUpdated(false), 3000);
  };

  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectUser = (user) => {
    setAnchorEl(null);
    setSharedUser(user);
  };

  const handleAddItem = () => {
    setItems([...items, { description: "", type: "", comments: "" }]);
    setShowOptions([...showOptions, false]);
  };

  const handleDescriptionChange = (index, event) => {
    const updatedItems = [...items];
    updatedItems[index].description = event.target.value;
    setItems(updatedItems);
  };

  const handleCommentsChange = (index, event) => {
    const updatedItems = [...items];
    updatedItems[index].comments = event.target.value;
    setItems(updatedItems);
  };

  const handleChooseClick = (index) => {
    const updatedShowOptions = [...showOptions];
    updatedShowOptions[index] = !updatedShowOptions[index];
    setShowOptions(updatedShowOptions);
  };

  const handleTypeChange = (index, type) => {
    const updatedItems = [...items];
    updatedItems[index].type = type;
    setItems(updatedItems);
    setShowOptions((prev) => prev.map((_, i) => (i === index ? false : _)));
  };

  return (
    <>
      <div className="dashboard-container">
        {isAdmin ? <Navbar /> : <UserNav />}
        {update && (
          <div className="alert-message-position">Updated Successfully!</div>
        )}
        {sharedUser && (
          <div className="alert-message-position">
            Checklist is shared with {sharedUser}!
          </div>
        )}

        <h2 className="template">Daily Checklist</h2>
        <button className="items-position" onClick={handleAddItem}>
          Add Items
        </button>

        <div className="back-position">
          <table className="template-position">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Checklist Items</th>
                <th style={{ width: "15rem" }}>Type</th>
                <th>Comments</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}.</td>

                  <td>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(event) =>
                        handleDescriptionChange(index, event)
                      }
                      placeholder="Enter item description"
                    />
                  </td>

                  <td>
                    <div
                      style={{ textAlign: "center", cursor: "pointer" }}
                      onClick={() => handleChooseClick(index)}
                    >
                      Select the type
                    </div>
                    {showOptions[index] && (
                      <div>
                        <button
                          onClick={() => handleTypeChange(index, "yesNo")}
                        >
                          Yes/No
                        </button>
                        <button
                          onClick={() => handleTypeChange(index, "input")}
                        >
                          Enter a number
                        </button>
                      </div>
                    )}
                    {item.type === "yesNo" && (
                      <div>
                        <label>
                          <input
                            type="radio"
                            value="Yes"
                            name={`yesNo-${index}`}
                          />{" "}
                          Yes
                        </label>
                        <label>
                          <input
                            type="radio"
                            value="No"
                            name={`yesNo-${index}`}
                          />{" "}
                          No
                        </label>
                      </div>
                    )}
                    {item.type === "input" && (
                      <input
                        type="number"
                        placeholder="Enter a number"
                        value={item.comments}
                        onChange={(event) => handleCommentsChange(index, event)}
                      />
                    )}
                  </td>

                  <td>
                    <textarea
                      value={item.comments}
                      onChange={(event) => handleCommentsChange(index, event)}
                      placeholder="Add comments"
                    />
                  </td>
                  <td>
                    <button>
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="same-line">
          <button>
            Date <input type="date" />
          </button>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={handleShareClick}>Share to</button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => handleSelectUser("All")}>Public</MenuItem>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default Template;
