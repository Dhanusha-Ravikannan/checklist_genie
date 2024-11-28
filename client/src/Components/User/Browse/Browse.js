

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Browse.css";
import Sidebar from "../../../Components/User/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { IoMdSend } from "react-icons/io";
import { TextField } from "@mui/material";

function Browse() {
  const [sortBy, setSortBy] = useState("Assigned");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [tags, setTags] = useState([]);
  const [checklistItems, setChecklistItems] = useState("")
  const [isTrue , setIsTrue] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing. Please log in.");
      navigate("/login");
      return;
    }

    const fetchTemplatesAndTags = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/template/getTemplates`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTemplates(response.data.templates);
        setTags(response.data.tags);
      } catch (error) {
        console.error("Error fetching templates and tags:", error);
      }
    };

    fetchTemplatesAndTags();
  }, [navigate]);

  const handleView = async (tag_id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/items/getItemsByTemplate/${tag_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setItems(response.data);
      setModalContent("Items");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setItems([]);
  };

  const handleInputChange = (index, type, value) => {
    const updatedItems = [...items];
    if (type === "boolean") {
      updatedItems[index].response = value === "Yes";
    } else if (type === "number") {
      updatedItems[index].numericValue = value;
    } else {
      updatedItems[index].comments = value;
    }
    setItems(updatedItems);
  };

  

  const handleActionClick = async (index) => {
    const item = items[index];
    try {
      const token = localStorage.getItem("token");
      const payload = {
        status: item.response || false,
        comments: item.comments || null,
        checklist_template_linked_items_id: item.linkedItemId,
        user_assigned_checklist_template_id: 1, 
        template_version: item.templateVersionId,
        number_input: item.numericValue || null,
        selected_date: selectedDate,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/response/createResponse`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data,"1111111111111111")
      alert("Checklist submitted successfully!");
    } catch (error) {
      console.error("Error submitting checklist:", error);
      alert("Failed to submit checklist. Please try again.");
    }
  };
    const handleYesNoChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].response = value === "Yes"  ? true : false; 
    setItems(updatedItems);
    setIsTrue(true)
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const handleNumericChange = (index, value) => {
    const updatedItems = [...checklistItems]; 
    updatedItems[index].numericValue = value; 
    setChecklistItems(updatedItems); 
  };
  
  

  return (
    <>
      <Sidebar />
      <div className="browse-container">
        <div className="content">
          <h2 className="checklist-heading">Assigned Checklist</h2>

          <div className="main-card">
            <div className="filter-container">
              <input
                type="text"
                placeholder="Browse Checklist"
                className="search-input"
              />
              <div className="sort-container">
                <label htmlFor="sort-select">Sort by:</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="Assigned">Assigned</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="card-container">
              {templates.length > 0 ? (
                templates.map((template) => (
                  <div key={template.id} className="card">
                    <h3>{template.template_name}</h3>
                    <h3 className="view" onClick={() => handleView(template.tag_id)}>
                      View
                    </h3>
                  </div>
                ))
              ) : (
                <p>No templates found</p>
              )}
            </div>
          </div>

          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={handleCloseModal}>
                  &times;
                </span>

                {modalContent === "Items" && (
                  <div>
                    <button>
                      Date:{" "}
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="date-picker"
                      />
                    </button>
                    <h3>Checklist Items</h3>
                    <table>
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Description</th>
                          <th>Response</th>
                          <th>Comments</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.checklist_name}</td>
                            <td>
                              {item.checklist_name
                                .toLowerCase()
                                .includes("number of") ||
                              item.checklist_name
                                .toLowerCase()
                                .startsWith("no of") ? (
                                <TextField
                                  variant="outlined"
                                  size="small"
                                  value={item.numericValue || ""}
                                  onChange={(e) =>
                                    handleNumericChange(index, e.target.value)
                                  }
                                  placeholder= "Optional"
                                  type="number"
                                />
                              ) : (
                                <div>
                                <label>
                                  <input
                                    type="radio"
                                    value="Yes"
                                    name={`yesNo`}
                                    onChange={() => handleYesNoChange(index, "Yes")}
                                  />{" "}
                                  Yes
                                </label>
                                <label>
                                  <input
                                    type="radio"
                                    value="No"
                                    name={`yesNo`}
                                    // checked={item.response === false} 
                                    onChange={() => handleYesNoChange(index, "No")}
                                  />{" "}
                                  No
                                </label>
                              </div>
                              )}
                            </td>
                            <td>
                              <TextField
                                variant="outlined"
                                size="small"
                                value={item.comments || ""}
                                onChange={(e) =>
                                  handleInputChange(index, "text", e.target.value)
                                }
                              />
                            </td>
                            <td>
                              <IoMdSend
                                style={{ color: "green", fontSize: "1.5rem", cursor: "pointer" }}
                                onClick={() => handleActionClick(index)}
                              />
                            </td>
                           
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Browse;

