// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../../admin/Checklist/Checklist.css";
// import Navbar from "../../../Pages/admin/Navbar/Navbar";
// import UserNav from "../../../Components/User/Sidebar/Sidebar";
// import { useLocation } from "react-router-dom";

// const Checklist = () => {
//   const [update, setUpdate] = useState(false);
//   const [priorityVisible, setPriorityVisible] = useState(false);
//   const [selectedPriority, setSelectedPriority] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [template_name, setTemplate_name] = useState("");
//   const [tags, setTags] = useState([]);
//   const [tag_id, setTag_id] = useState(null);
//   const [tag_name, setTag_name] = useState("");
//   const [checklist_name, setChecklist_name] = useState("");
//   const [Instructions, setInstructions] = useState("");
//   const [dataType, setDataType] = useState("");
//   const location = useLocation();
//   const isAdmin = location.pathname.includes("/admin/checklist");

//   const priorities = ["High", "Medium", "Low"];

//   const handlePriorityClick = () => {
//     setPriorityVisible(!priorityVisible);
//   };

//   const handleSelectPriority = (priority) => {
//     setSelectedPriority(priority);
//     setPriorityVisible(false);
//     console.log(`Priority selected: ${priority}`);
//   };

//   const handleDateChange = (e) => {
//     setSelectedDate(e.target.value);
//     console.log(`Selected date: ${e.target.value}`);
//   };

//   const handleAddItemsClick = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       console.log("Payload:", {
//         template_name,
//         tag_id: parseInt(tag_id),
//         tag_name,
//       });
//       const template = await axios.post(
//         `${process.env.REACT_APP_BACKEND_SERVER_URL}/template/createTemplate`,
//         {
//           template_name,
//           tag_id: parseInt(tag_id),
//           tag_name,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert("Template Created Successfully!!!");
//       console.log("Template Created:", template.data);
//       setUpdate(true);
//     } catch (error) {
//       console.log("Error saving template:", error);
//       alert("No Templates created!!");
//     }

//     setIsModalOpen(true);
//   };

//   useEffect(() => {
//     const storeTokenNew = () => {
//       const params = new URLSearchParams(window.location.search);
//       const token = params.get("token");
//       if (token) {
//         localStorage.setItem("token", token);
//         console.log("Token stored from URL:", token);
//       }
//     };

//     storeTokenNew();

//     const storedToken = localStorage.getItem("token");

//     if (storedToken) {
//       console.log("Token retrieved:", storedToken);
//     } else {
//       console.log("No token found");
//     }

//     const getTags = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         console.log("Attempting to fetch templates...");
//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_SERVER_URL}/tags/getAll`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setTags(response.data);
//         console.log("Tags fetched:", response.data);
//       } catch (error) {
//         console.error("Error fetching tags:", error);
//       }
//     };

//     getTags();
//   }, []);

//   const handleSelectName = (e) => {
//     const selectedTagName = e.target.value;
//     setTag_name(selectedTagName);

//     const selectedTag = tags.find((tag) => tag.tag_name === selectedTagName);
//     if (selectedTag) {
//       setTag_id(selectedTag.id);
//     }
//   };

//   const handleSaveNewItem = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const item = await axios.post(
//         `${process.env.REACT_APP_BACKEND_SERVER_URL}/items/createItems`,
//         {
//           checklist_name,
//           Instructions,
//           tag_id: parseInt(tag_id),
//           input_type: dataType,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("Item created successfully!");
//       console.log("Item response:", item.data);
//     } catch (error) {
//       console.error("Error creating item:", error);
//       alert("Failed to create item. Please try again.");
//     }
//   };

//   return (
//     <>
//       <div className="dashboard-container">
//         {isAdmin ? <Navbar /> : <UserNav />}
//         {update && (
//           <div className="alert-message-position">Saved Successfully!</div>
//         )}
//         <div className=" popup">
//           <div className="content">
//             <div style={{ fontWeight: "bold" }}>
//               Checklist Name:
//               <input
//                 style={{ width: "12rem", height: "2.5rem", marginLeft: "2rem" }}
//                 type="text"
//                 value={template_name}
//                 onChange={(e) => setTemplate_name(e.target.value)}
//               />
//             </div>
//             <br />

//             <div className="tag-dropdown">
//               <label style={{ fontWeight: "bold", marginRight: "2.3rem" }}>
//                 Select Tag:
//               </label>
//               <select value={tag_name} onChange={handleSelectName}>
//                 <option value="">Select a tag Name</option>
//                 {tags.map((tag) => (
//                   <option key={tag.id} value={tag.tag_name}>
//                     {tag.tag_name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <button className="add-position" onClick={handleAddItemsClick}>
//               Add Items
//             </button>
//           </div>
//         </div>
//         {isModalOpen && (
//           <div className="modal">
//             <div className="modal-content">
//               <h2>Checklist Name</h2>
//               <div className="first-fill">
//                 <button style={{ marginRight: "10rem" }}>
//                   Date:{" "}
//                   <input
//                     type="date"
//                     value={selectedDate}
//                     onChange={handleDateChange}
//                     className="date-picker"
//                   />
//                 </button>

//                 <button
//                   style={{ marginRight: "10rem" }}
//                   onClick={handlePriorityClick}
//                   className="priority-label"
//                 >
//                   Priority: {selectedPriority || "Select"}
//                 </button>
//                 {priorityVisible && (
//                   <div className="priority-dropdown">
//                     {priorities.map((priority, index) => (
//                       <div
//                         key={index}
//                         onClick={() => handleSelectPriority(priority)}
//                         className="dropdown-option"
//                       >
//                         {priority}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <br />
//               <div className="input-field">
//                 <label>Item Name:</label>
//                 <input
//                   type="text"
//                   value={checklist_name}
//                   onChange={(e) => setChecklist_name(e.target.value)}
//                 />
//                 <label>Description:</label>
//                 <textarea
//                   value={Instructions}
//                   onChange={(e) => setInstructions(e.target.value)}
//                 />
//                 <br></br>
//                 <label>Input Type:</label>
//                 <select
//                   value={dataType}
//                   onChange={(e) => setDataType(e.target.value)}
//                 >
//                   <option value="">Select Input Type</option>
//                   <option value="Boolean">Boolean</option>
//                   <option value="Numeric">Numeric</option>
//                 </select>
//               </div>
//               <br></br>
//               <button
//                 style={{ backgroundColor: "#25274D" }}
//                 onClick={handleSaveNewItem}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Checklist;

// Checklist.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../../Pages/admin/Navbar/Navbar";
import UserNav from "../../../Components/User/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import "./Checklist.css";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { FaPaste, FaExchangeAlt, FaPaperPlane } from "react-icons/fa";

const Checklist = () => {
  const [update, setUpdate] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [template_name, setTemplate_name] = useState("");
  const [tags, setTags] = useState([]);
  const [tag_id, setTag_id] = useState(null);
  const [tag_name, setTag_name] = useState("");
  const [checklist_name, setChecklist_name] = useState("");
  const [Instructions, setInstructions] = useState("");
  const [dataType, setDataType] = useState("");
  const [templateVersionId, setTemplateVersionId] = useState(null);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [bulkData, setBulkData] = useState("");
  const [bulkPreview, setBulkPreview] = useState([]);
  const [skipFirstRow, setSkipFirstRow] = useState(true);

  const location = useLocation();
  const isAdmin = location.pathname.includes("/admin/checklist");
  const priorities = ["High", "Medium", "Low"];

  const toggleMode = () => {
    setIsBulkMode(!isBulkMode);
    setBulkPreview([]);
    setBulkData("");
  };

  const handleDateChange = (e) => setSelectedDate(e.target.value);

  const handleAddItemsClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/template/createTemplate`,
        {
          template_name,
          tag_id: parseInt(tag_id),
          priority: selectedPriority.toUpperCase() || "HIGH",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Template Created Successfully!");
      setUpdate(true);
      setTemplateVersionId(response.data.newVersion.version_id);
      setIsModalOpen(true);
    } catch (error) {
      console.log("Error creating template:", error);
      alert("Failed to create template");
    }
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/tags/getAll`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTags(res.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags();
  }, []);

  const handleSelectName = (e) => {
    const selectedName = e.target.value;
    setTag_name(selectedName);
    const tag = tags.find((tag) => tag.tag_name === selectedName);
    if (tag) setTag_id(tag.id);
  };

  const handleSaveNewItem = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/items/createItems`,
        {
          checklistItems: [
            {
              checklist_name,
              Instructions,
              tag_id: parseInt(tag_id),
              input_type: dataType,
            },
          ],
          template_version_id: templateVersionId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Item created successfully!");
    } catch (error) {
      console.error("Error creating item:", error);
      alert("Failed to create item.");
    }
  };

  const handleBulkPaste = () => {
    const rows = bulkData
      .trim()
      .split("\n")
      .map((r) => r.trim());
    const preview = [];

    for (let i = 0; i < rows.length; i++) {
      if (skipFirstRow && i === 0) continue;

      const columns = rows[i].split("\t").map((col) => col.trim());

      let name = "";
      let desc = "";
      let type = "";

      for (let col of columns) {
        if (["boolean", "numeric"].includes(col.toLowerCase())) {
          type = col;
        } else if (!name) {
          name = col;
        } else {
          desc = col;
        }
      }

      preview.push({
        checklist_name: name || "",
        Instructions: desc || "",
        input_type: type || "",
      });
    }

    setBulkPreview(preview);
  };

  const updateBulkField = (index, field, value) => {
    const updated = [...bulkPreview];
    updated[index][field] = value;
    setBulkPreview(updated);
  };

  const handleSubmitBulk = async () => {
    const incomplete = bulkPreview.find(
      (item) => !item.checklist_name || !item.Instructions || !item.input_type
    );
    if (incomplete) {
      alert("Please fill all fields (Name, Description, Input Type).");
      return;
    }

    try {
      const checklistItems = bulkPreview.map((item) => ({
        ...item,
        tag_id: parseInt(tag_id),
      }));

      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/items/createItems`,
        {
          checklistItems,
          template_version_id: templateVersionId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Bulk items created successfully!");
      setBulkPreview([]);
      setBulkData("");
    } catch (error) {
      console.error("Error submitting bulk items:", error);
      alert("Bulk creation failed.");
    }
  };

  return (
    <div className="dashboard-container">
      {isAdmin ? <Navbar /> : <UserNav />}

      <div className="popup">
        <div className="content">
          <h2>Create Checklist</h2>
          <div className="form-group">
            <label>Checklist Name:</label>
            <input
              type="text"
              value={template_name}
              onChange={(e) => setTemplate_name(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Select Tag:</label>
            <select value={tag_name} onChange={handleSelectName}>
              <option value="">Select a tag</option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.tag_name}>
                  {tag.tag_name}
                </option>
              ))}
            </select>
          </div>
          <button className="primary-button" onClick={handleAddItemsClick}>
            Create Template
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Checklist Items</h2>
            <div className="modal-header">
              <div className="form-group">
                <label>Date:</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </div>
              <div className="form-group">
                <label>Priority:</label>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                >
                  <option value="">Select</option>
                  {priorities.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <button onClick={toggleMode} className="icon-button">
                <FaExchangeAlt /> {isBulkMode ? "Manual" : "Bulk Paste"}
              </button>
            </div>

            {isBulkMode ? (
              <>
                {/* <textarea
                  rows="6"
                  placeholder="Paste items here (TAB-separated)"
                  value={bulkData}
                  onChange={(e) => setBulkData(e.target.value)}
                  className="textarea"
                />
                <div className="form-group checkbox-row">
                  <input
                    type="checkbox"
                    checked={skipFirstRow}
                    onChange={() => setSkipFirstRow(!skipFirstRow)}
                  />
                  <label style={{ marginLeft: "6px" }}>
                    Skip first row (headers)
                  </label>
                </div>
                <button onClick={handleBulkPaste} className="primary-button">
                  <FaPaste /> Preview
                </button> */}

                <div className="bulk-paste-section">
                  <textarea
                    placeholder="Paste your checklist items here (TAB-separated)"
                    value={bulkData}
                    onChange={(e) => setBulkData(e.target.value)}
                  />
                  <div className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={skipFirstRow}
                      onChange={() => setSkipFirstRow(!skipFirstRow)}
                    />
                    <label>Skip first row (headers)</label>
                  </div>

                  <button onClick={handleBulkPaste} className="primary-button">
                    <FaPaste /> Preview
                  </button>
                </div>

                <div className="card-container">
                  {bulkPreview.map((item, idx) => {
                    const complete =
                      item.checklist_name.trim() &&
                      item.Instructions.trim() &&
                      item.input_type.trim();

                    return (
                      <div
                        key={idx}
                        className={`item-card ${complete ? "success" : "error"}`}
                      >
                        <input
                          type="text"
                          value={item.checklist_name}
                          onChange={(e) =>
                            updateBulkField(
                              idx,
                              "checklist_name",
                              e.target.value
                            )
                          }
                          placeholder="Item Name"
                        />
                        <textarea
                          value={item.Instructions}
                          onChange={(e) =>
                            updateBulkField(idx, "Instructions", e.target.value)
                          }
                          placeholder="Description (optional)"
                        />
                        <select
                          value={item.input_type}
                          onChange={(e) =>
                            updateBulkField(idx, "input_type", e.target.value)
                          }
                        >
                          <option value="">Select Input Type</option>
                          <option value="Boolean">Boolean</option>
                          <option value="Numeric">Numeric</option>
                        </select>

                        <div className="status-icon">
                          {complete ? (
                            <FaCheckCircle color="green" title="Valid Item" />
                          ) : (
                            <FaTimesCircle color="red" title="Missing Fields" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {bulkPreview.length > 0 && (
                  <button onClick={handleSubmitBulk} className="submit-button">
                    <FaPaperPlane /> Submit
                  </button>
                )}
              </>
            ) : (
              <>
                <div className="input-field">
                  <label>Item Name:</label>
                  <input
                    type="text"
                    value={checklist_name}
                    onChange={(e) => setChecklist_name(e.target.value)}
                  />
                  <label>Description:</label>
                  <textarea
                    value={Instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                  />
                  <label>Input Type:</label>
                  <select
                    value={dataType}
                    onChange={(e) => setDataType(e.target.value)}
                  >
                    <option value="">Select Input Type</option>
                    <option value="Boolean">Boolean</option>
                    <option value="Numeric">Numeric</option>
                  </select>
                </div>
                <button onClick={handleSaveNewItem} className="primary-button">
                  Save Item
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Checklist;
