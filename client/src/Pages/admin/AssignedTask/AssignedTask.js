import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AssignedTask.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Navbar from "../../../Pages/admin/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

// import ShareIcon from "@mui/icons-material/Share";

const AssignedTask = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [selectedTemplateDetails, setSelectedTemplateDetails] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checklist_name, setChecklist_name] = useState("");
  const [Instructions, setInstructions] = useState("");
  const [dataType, setDataType] = useState("");

  const [editedTemplateName, setEditedTemplateName] = useState("");
  const [editedItems, setEditedItems] = useState([]);
  const [availableInputTypes, setAvailableInputTypes] = useState([]);
  const [isEditingTemplateName, setIsEditingTemplateName] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchAllTags = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/template/getTemplate`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.templates);
      } catch (error) {
        console.error("Error fetching tags data:", error);
      }
    };

    fetchAllTags();
  }, []);

  const getTagWithTemplateAndItems = async (
    tag_id,
    current_version_id,
    template_id
  ) => {
    const token = localStorage.getItem("token");

    try {
      const selectedTemplate = data.find((item) => item.id === template_id);

      setSelectedTemplateDetails(selectedTemplate);

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/items/getItemsByTemplate/${tag_id}/${current_version_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelectedTemplate(response.data);
      setIsViewModalOpen(true);
    } catch (error) {
      console.error("Error fetching tag with template and items:", error);
    }
  };

  // const editTag = async (tag_id, current_version_id, template_id) => {
  //   const token = localStorage.getItem("token");
  //   try {

  //     const response = await axios.get(
  //       `${process.env.REACT_APP_BACKEND_SERVER_URL}/items/getItemsByTemplate/${tag_id}/${current_version_id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     const selectedTemplate = data.find((item) => item.id === template_id);

  //     setSelectedTemplateDetails(selectedTemplate);

  //     setSelectedTemplate(response.data);
  //     setIsModalOpen(true);
  //   } catch (error) {
  //     console.error("Error fetching tag for editing:", error);
  //   }
  // };

  const editTag = async (tag_id, current_version_id, template_id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/items/getItemsByTemplate/${tag_id}/${current_version_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Items :", response.data);

      const selectedTemplate = data.find((item) => item.id === template_id);

      const allInputTypes = ["Boolean", "Numeric"];
      setAvailableInputTypes(allInputTypes);
      setSelectedTemplateDetails(selectedTemplate);
      setEditedTemplateName(selectedTemplate.template_name);
      setEditedItems(response.data);
      setSelectedTemplate(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching tag for editing:", error);
    }
  };

  const handleEditFieldChange = (index, field, value) => {
    const updatedItems = [...editedItems];
    updatedItems[index][field] = value;
    setEditedItems(updatedItems);
  };

  // const deleteTag = async (tag_id) => {
  //   const token = localStorage.getItem("token");

  //   try {
  //     await axios.delete(
  //       `${process.env.REACT_APP_BACKEND_SERVER_URL}/tags/deleteTag/${tag_id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     setData(data.filter((tag) => tag.id !== tag_id));
  //     alert("Tag successfully deleted!");
  //   } catch (error) {
  //     console.error("Error deleting tag:", error);
  //     alert("Failed to delete the tag.");
  //   }
  // };

  const deleteTag = async (tag_id) => {
    const token = localStorage.getItem("token");

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tag and all its linked checklist data?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/tags/deleteTag/${tag_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData((prevData) => prevData.filter((tag) => tag.id !== tag_id));
      alert("✅ Tag successfully deleted!");
    } catch (error) {
      console.error("Error deleting tag:", error);
      alert("❌ Failed to delete the tag.");
    }
  };

  const addExtraItem = async (tag_id, template_id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/items/addItem/${tag_id}/${template_id}`,
        {
          checklist_name,
          Instructions,
          input_type: dataType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newItem = response.data?.extraItem;

      if (newItem) {
        setEditedItems((prevItems) => [
          ...prevItems,
          {
            id: newItem.id,
            checklist_name: newItem.checklist_name,
            Instructions: newItem.Instructions || "",
            input_type: newItem.input_type,
          },
        ]);
      }

      alert("Item successfully added!");

      setChecklist_name("");
      setInstructions("");
      setDataType("");
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item.");
    }
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedTemplate(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTemplate(null);
  };

  const handletemplaterecepients = (templateId) => {
    navigate(`/admin/templaterecepients/${templateId}`);
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/template/editTemplateAndItems/${selectedTemplateDetails.Tags.id}/${selectedTemplateDetails.id}`,
        {
          template_name: editedTemplateName,
          items: editedItems.map((item) => ({
            item_id: item.id,
            checklist_name: item.checklist_name,
            Instructions: item.Instructions || "",
            input_type: item.input_type,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Template and items updated successfully!");
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        {data.map((template) => (
          <div key={template.id} className="cardd">
            <div className="card-headerr">
              <div className="card-content">
                <h2 className="template-title">{template.template_name}</h2>
                <p className="position">
                  <strong>User Positions:</strong>{" "}
                  {template.Tags?.user_position}
                </p>
                <button
                  className="view-btn"
                  onClick={() =>
                    getTagWithTemplateAndItems(
                      template.Tags.id,
                      template.current_version_id,
                      template.id
                    )
                  }
                >
                  VIEW
                </button>
              </div>

              <div className="iconss">
                <span
                  onClick={() =>
                    editTag(
                      template.Tags.id,
                      template.current_version_id,
                      template.id
                    )
                  }
                  title="Edit"
                >
                  <EditIcon />
                </span>
                {/* <span onClick={() => deleteTag(template.id)} title="Delete">
                  <DeleteIcon />
                </span> */}
                <span
                  onClick={() => deleteTag(template.id)}
                  title="Delete Tag"
                  style={{
                    cursor: "pointer",
                    color: "#d32f2f",
                    marginLeft: "10px",
                  }}
                >
                  <DeleteIcon />
                </span>

                <span
                  onClick={() => handletemplaterecepients(template.id)}
                  title="Add User"
                >
                  <PersonAddIcon />
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* View Modal */}
        {isViewModalOpen && selectedTemplate && (
          <div className="modal">
            <div className="modal-content">
              <span className="close-button" onClick={closeViewModal}>
                &times;
              </span>
              <h2>{selectedTemplateDetails.template_name}</h2>
              <h3>Existing Items</h3>
              <table className="details-table">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Input Type</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedTemplate && selectedTemplate.length > 0 ? (
                    selectedTemplate.map((item) => (
                      <tr key={item.id}>
                        <td>{item.checklist_name}</td>
                        <td>{item.input_type}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">No items available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {/* {isModalOpen && selectedTemplate && (
          <div className="modal">
            <div className="modal-content">
              <span className="close-button" onClick={closeModal}>
                &times;
              </span>
              <h2>{selectedTemplateDetails.template_name}</h2>

              <div className="modal-body">

                
                <div className="edit-item-section">
                  <h3>Edit/Add Item</h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Checklist Name"
                      value={checklist_name}
                      onChange={(e) => setChecklist_name(e.target.value)}
                    />

                    <input
                      type="text"
                      name="Instructions"
                      placeholder="Instructions"
                      value={Instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                    />
                    <select
                      name="input_type"
                      value={dataType}
                      onChange={(e) => setDataType(e.target.value)}
                    >
                      <option value="">Select Input Type</option>
                      <option value="Boolean">Boolean</option>
                      <option value="Numeric">Numeric</option>
                    </select>
                    <br />
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        addExtraItem(selectedTemplateDetails.Tags.id, selectedTemplateDetails.id);
                      }}
                    >
                      Add/Update Item
                    </button>
                  </form>
                </div>

                <div className="existing-items-section">
                  <h3>Existing Items</h3>
                  <table className="details-table">
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th>Input Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedTemplate &&
                      selectedTemplate.length > 0 ? (
                        selectedTemplate.map((item) => (
                          <tr key={item.id}>
                            <td>{item.checklist_name}</td>
                            <td>{item.input_type}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="2">No items available.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )} */}

        {isModalOpen && selectedTemplate && (
          <div className="modal">
            <div className="modal-content">
              <span className="close-button" onClick={closeModal}>
                &times;
              </span>
              <h2>Edit Template</h2>

              {/* Template Name Edit */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                {isEditingTemplateName ? (
                  <input
                    type="text"
                    value={editedTemplateName}
                    onChange={(e) => setEditedTemplateName(e.target.value)}
                    placeholder="Template Name"
                    style={{ padding: "8px", fontSize: "16px", flex: 1 }}
                  />
                ) : (
                  <h3 style={{ margin: 0 }}>{editedTemplateName}</h3>
                )}

                <button
                  onClick={() => setIsEditingTemplateName((prev) => !prev)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                  title={
                    isEditingTemplateName
                      ? "Stop Editing"
                      : "Edit Template Name"
                  }
                >
                  ✏️
                </button>
              </div>

              <div className="modal-body">
                {/* Add New Item Section */}
                <div className="edit-item-section">
                  <h3>Add New Item</h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      addExtraItem(
                        selectedTemplateDetails.Tags.id,
                        selectedTemplateDetails.id
                      );
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Checklist Name"
                      value={checklist_name}
                      onChange={(e) => setChecklist_name(e.target.value)}
                    />
                    <input
                      type="text"
                      name="Instructions"
                      placeholder="Instructions"
                      value={Instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                    />
                    <select
                      name="input_type"
                      value={dataType}
                      onChange={(e) => setDataType(e.target.value)}
                    >
                      <option value="">Select Input Type</option>
                      {availableInputTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>

                    <br />
                    <button type="submit">Add Item</button>
                  </form>
                </div>

                {/* Edit Existing Items */}
                <div className="existing-items-section">
                  <h3>Edit Existing Items</h3>
                  <table className="details-table">
                    <thead>
                      <tr>
                        <th>Checklist Name</th>
                        <th>Input Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {editedItems.length > 0 ? (
                        editedItems.map((item, index) => (
                          <tr key={item.id}>
                            <td>
                              <input
                                type="text"
                                value={item.checklist_name}
                                onChange={(e) =>
                                  handleEditFieldChange(
                                    index,
                                    "checklist_name",
                                    e.target.value
                                  )
                                }
                              />
                            </td>

                            <td>
                              <select
                                value={item.input_type}
                                onChange={(e) =>
                                  handleEditFieldChange(
                                    index,
                                    "input_type",
                                    e.target.value
                                  )
                                }
                              >
                                {availableInputTypes.map((type) => (
                                  <option key={type} value={type}>
                                    {type}
                                  </option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">No items available.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <button onClick={handleSaveChanges}>Save Changes</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AssignedTask;
