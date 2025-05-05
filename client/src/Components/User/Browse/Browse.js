import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Browse.css";
import Sidebar from "../../../Components/User/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { IoMdSend } from "react-icons/io";
import { TextField } from "@mui/material";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Tooltip, IconButton } from "@mui/material";
import { AiOutlineQuestionCircle } from "react-icons/ai";

function Browse() {
  const [sortBy, setSortBy] = useState("Assigned");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [openedId, SetOpenedID] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(null);
  const [openDescriptionId, setOpenDescriptionId] = useState(null);

  const navigate = useNavigate();

  const fetchTemplates = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/template/getTemplates`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const templatesWithDueDates = response.data.templates.map((template) => {
        const submissionDate = template.lastSubmitted
          ? new Date(template.lastSubmitted)
          : null;
        const recurrence = template.Tags?.recurrent;
        const today = new Date();
        let nextDueDate = new Date(today);

        if (!submissionDate) {
          if (recurrence === "Daily") {
            // today already set
          } else if (recurrence === "Weekly") {
            nextDueDate.setDate(today.getDate() + 7);
          } else if (recurrence === "Monthly") {
            nextDueDate.setDate(today.getDate() + 30);
          }
        } else {
          nextDueDate = new Date(submissionDate);
          if (recurrence === "Daily") {
            nextDueDate.setDate(nextDueDate.getDate() + 1);
          } else if (recurrence === "Weekly") {
            nextDueDate.setDate(nextDueDate.getDate() + 7);
          } else if (recurrence === "Monthly") {
            nextDueDate.setDate(nextDueDate.getDate() + 30);
          }
        }

        return {
          ...template,
          lastSubmitted: submissionDate,
          nextDueDate,
        };
      });

      setTemplates(templatesWithDueDates);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [navigate]);

  const handleView = async (tag_id, current_version_id, template_id) => {
    try {
      const token = localStorage.getItem("token");
      SetOpenedID(template_id);

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/items/getItemsByTemplate/${tag_id}/${current_version_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Fetched Items:", response.data);

      const fetchedItems = response.data.map((item) => ({
        ...item,
        checklist_template_linked_items_id:
          item.ChecklistTemplateLinkedItems?.[0]?.checklist_item_id || null,
        template_version:
          item.ChecklistTemplateLinkedItems?.[0]?.template_version_id || null,
        response:
          item.input_type === "Boolean"
            ? item.response || item.input || ""
            : null,
        numberInput:
          item.input_type === "Numeric" && item.numberInput !== undefined
            ? item.numberInput
            : 0,
        comments: item.comments || "",
      }));

      setItems(fetchedItems);
      setModalContent("Items");
      setIsModalOpen(true);
    } catch (error) {
      console.error(
        "Error fetching items:",
        error.response?.data || error.message
      );
    }
  };

  const handleTooltipToggle = (templateId) => {
    setTooltipOpen(tooltipOpen === templateId ? null : templateId);
  };

  const toggleDescription = (itemId) => {
    setOpenDescriptionId(openDescriptionId === itemId ? null : itemId);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setItems([]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    if (field === "response" && updatedItems[index].input_type === "Boolean") {
      updatedItems[index].input = value;
    } else if (
      field === "numberInput" &&
      updatedItems[index].input_type === "Numeric"
    ) {
      updatedItems[index].input = value || null;
    }

    setItems(updatedItems);
  };

  const handleActionClick = async (index) => {
    const item = items[index];
    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");
      const dateToSubmit =
        selectedDate || new Date().toISOString().split("T")[0];

      const payload = {
        status:
          item.response === true || item.response === "Yes" ? "Yes" : "No",
        input: item.input || "",
        comments: item.comments || null,
        checklist_template_linked_items_id:
          item.ChecklistTemplateLinkedItems[0].id,
        user_assigned_checklist_template_id: 1,
        template_version: item.template_version,
        selected_date: dateToSubmit,
      };

      await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/response/createResponse`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Checklist submitted successfully!");
    } catch (error) {
      console.error("Error submitting checklist:", error);
      alert("Failed to submit checklist. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleBulkSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      setIsSubmitting(true);

      if (!items || items.length === 0) {
        alert("No checklist items to submit.");
        return;
      }

      const checklistTemplateId = openedId;
      if (!checklistTemplateId) {
        alert("Checklist Template ID is missing.");
        return;
      }

      const selectedSubmissionDate =
        selectedDate || new Date().toISOString().split("T")[0];

      const submissionPromises = items.map((item) =>
        axios.post(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/response/createResponse`,
          {
            status: item.response === true ? "Yes" : "No",
            input: item.input,
            comments: item.comments || null,
            checklist_template_linked_items_id:
              item.ChecklistTemplateLinkedItems?.[0]?.id,
            user_assigned_checklist_template_id: 1,
            template_version: item.template_version,
            selected_date: selectedSubmissionDate,
            response: item.input,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      );

      await Promise.all(submissionPromises);
      localStorage.setItem(
        `submitted_${checklistTemplateId}`,
        selectedSubmissionDate
      );

      // Email notification request
      const emailResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/checklist/submit`,
        {
          checklistTemplateId,
          checklistItems: items,
          selectedDate: selectedSubmissionDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (emailResponse.status === 200) {
        alert("Checklist submitted and email sent successfully!");
      } else {
        alert("Checklist submitted, but failed to send email.");
      }

      fetchTemplates();
    } catch (error) {
      console.error("Error submitting checklist:", error);
      alert("Failed to submit checklist. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
                    <div className="submission-info-row">
                      {template.lastSubmitted && (
                        <p>
                          Last Submitted:{" "}
                          <span>
                            
                            {
                              new Date(template.lastSubmitted)
                                .toISOString()
                                .split("T")[0]
                            }
                            
                          </span>
                        </p>
                      )}
                      <p>
                        Due Date:{" "}
                        <span>
                          
                          {
                            new Date(template.nextDueDate)
                              .toISOString()
                              .split("T")[0]
                          }
                          
                        </span>
                      </p>
                    </div>

                    <div className="template-header">
                      <h3 className="template-title">
                        {template.template_name}
                      </h3>
                      <Tooltip
                        title={
                          template.Tags?.description ||
                          "No description available"
                        }
                        arrow
                        open={tooltipOpen === template.id}
                        onClose={() => setTooltipOpen(null)}
                        componentsProps={{
                          tooltip: {
                            sx: {
                              fontSize: "16px",
                              maxWidth: 250,
                              lineHeight: 1.6,
                              bgcolor: "#25274D",
                              color: "#fff",
                              padding: "10px",
                            },
                          },
                        }}
                      >
                        <IconButton
                          onClick={() => handleTooltipToggle(template.id)}
                          size="small"
                          style={{ padding: "0", marginTop: "2px" }}
                        >
                          <AiOutlineQuestionCircle />
                        </IconButton>
                      </Tooltip>
                    </div>

                    <div
                      className="view"
                      onClick={() =>
                        handleView(
                          template.Tags.id,
                          template.current_version_id,
                          template.id
                        )
                      }
                    >
                      View
                    </div>
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
                    <div className="modal-header-row">
                      <div className="left">
                        {templates
                          .filter((t) => t.id === openedId)
                          .map((template) =>
                            template.lastSubmitted ? (
                              <p key={template.id}>
                                <strong>Last Submitted:</strong>{" "}
                                {
                                  new Date(template.lastSubmitted)
                                    .toISOString()
                                    .split("T")[0]
                                }
                              </p>
                            ) : (
                              <p key={template.id}>No submissions yet</p>
                            )
                          )}
                      </div>

                      <div className="center">
                        <label>
                          <strong>Date:</strong>{" "}
                          <input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            className="date-picker"
                          />
                        </label>
                      </div>

                      <div className="right">
                        {templates
                          .filter((t) => t.id === openedId)
                          .map((template) => (
                            <p key={template.id}>
                              <strong>Due Date:</strong>{" "}
                              {
                                new Date(template.nextDueDate)
                                  .toISOString()
                                  .split("T")[0]
                              }
                            </p>
                          ))}
                      </div>
                    </div>

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
                            <td>
                              {item.checklist_name}
                              <Tooltip
                                title={
                                  item.Instructions ||
                                  "No instructions available"
                                }
                                arrow
                                open={openDescriptionId === index}
                                onClose={() => setOpenDescriptionId(null)}
                                componentsProps={{
                                  tooltip: {
                                    sx: {
                                      fontSize: "16px",
                                      maxWidth: 250,
                                      lineHeight: 1.6,
                                      bgcolor: "#25274D",
                                      color: "#fff",
                                      padding: "10px",
                                    },
                                  },
                                }}
                              >
                                <IconButton
                                  onClick={() => toggleDescription(index)}
                                  size="small"
                                  style={{
                                    padding: "0",
                                    marginLeft: "3px",
                                    marginTop: "-3px", // Moves it a little higher
                                  }}
                                >
                                  <AiOutlineQuestionCircle
                                    style={{
                                      fontSize: "1rem", // Smaller size
                                      color: "#25274D",
                                      cursor: "pointer",
                                      position: "absolute",
                                      marginBottom: "1rem",
                                      marginLeft: "1rem",
                                    }}
                                  />
                                </IconButton>
                              </Tooltip>
                            </td>

                            <td>
                              {item.input_type === "Boolean" ? (
                                <RadioGroup
                                  row
                                  value={item.response || ""}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "response",
                                      e.target.value
                                    )
                                  }
                                >
                                  <FormControlLabel
                                    value="Yes"
                                    control={<Radio />}
                                    label="Yes"
                                  />
                                  <FormControlLabel
                                    value="No"
                                    control={<Radio />}
                                    label="No"
                                  />
                                </RadioGroup>
                              ) : item.input_type === "Numeric" ? (
                                <TextField
                                  type="number"
                                  variant="outlined"
                                  size="small"
                                  value={item.numberInput || ""}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "numberInput",
                                      e.target.value
                                    )
                                  }
                                  inputProps={{ min: 0 }}
                                />
                              ) : null}
                            </td>

                            <td>
                              <TextField
                                variant="outlined"
                                size="small"
                                value={item.comments || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "comments",
                                    e.target.value
                                  )
                                }
                                placeholder="Add comments (optional)"
                              />
                            </td>
                            <td>
                              <IoMdSend
                                style={{
                                  color: isSubmitting ? "gray" : "green",
                                  fontSize: "1.5rem",
                                  cursor: isSubmitting
                                    ? "not-allowed"
                                    : "pointer",
                                }}
                                onClick={
                                  isSubmitting
                                    ? undefined
                                    : () => handleActionClick(index)
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="submit-container">
                      <button
                        className="submit-button"
                        onClick={handleBulkSubmit}
                        disabled={isSubmitting}
                      >
                        Submit
                      </button>
                    </div>
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

{
  /* <tbody>
                        {items.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.checklist_name}</td>

                            <td>
                              {item.input_type === "Boolean" ? (
                                <RadioGroup
                                  row
                                  value={item.response || ""}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "response",
                                      e.target.value
                                    )
                                  }
                                >
                                  <FormControlLabel
                                    value="Yes"
                                    control={<Radio />}
                                    label="Yes"
                                  />
                                  <FormControlLabel
                                    value="No"
                                    control={<Radio />}
                                    label="No"
                                  />
                                </RadioGroup>
                              ) : item.input_type === "Numeric" ? (
                                <TextField
                                  type="number"
                                  variant="outlined"
                                  size="small"
                                  value={item.numberInput || ""}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "numberInput",
                                      e.target.value
                                    )
                                  }
                                  inputProps={{ min: 0 }}
                                />
                              ) : null}
                            </td>

                            <td>
                              <TextField
                                variant="outlined"
                                size="small"
                                value={item.comments || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "comments",
                                    e.target.value
                                  )
                                }
                                placeholder="Add comments (optional)"
                              />
                            </td>
                            <td>
                              <IoMdSend
                                style={{
                                  color: isSubmitting ? "gray" : "green",
                                  fontSize: "1.5rem",
                                  cursor: isSubmitting
                                    ? "not-allowed"
                                    : "pointer",
                                }}
                                onClick={
                                  isSubmitting
                                    ? undefined
                                    : () => handleActionClick(index)
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody> */
}
