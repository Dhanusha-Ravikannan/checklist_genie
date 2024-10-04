
import React, { useState } from "react";
import "./Browse.css";
import Sidebar from "../../../Components/User/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import Pending from "../Pending/Pending";
import Completed from "../Complete/Complete";
import Daily from "../Daily/Daily";
import Decision from "../Decision/Decision"; 

function Browse() {
  const [sortBy, setSortBy] = useState("Assigned");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  const handleView = (name) => {
    if (name === "Daily Checklist") {
      setModalContent("Daily");
      setIsModalOpen(true);
    } else if (name === "Decision Coach") {
      setModalContent("Decision"); 
      setIsModalOpen(true);
    } else {
      navigate("/details", { state: { checklistName: name } });
    }
  };

  const handleOpenModal = (type) => {
    setModalContent(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
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
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    if (e.target.value === "Pending") {
                      handleOpenModal("Pending");
                    } else if (e.target.value === "Completed") {
                      handleOpenModal("Completed");
                    }
                  }}
                  className="sort-select"
                >
                  <option value="Assigned">Assigned</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="card-container">
              <div className="card">
                <h3>Daily Checklist</h3>
                <h3
                  className="view"
                  onClick={() => handleView("Daily Checklist")}
                >
                  View
                </h3>
              </div>
              <div className="card">
                <h3>Decision Coach</h3>
                <h3
                  className="view"
                  onClick={() => handleView("Decision Coach")}
                >
                  View
                </h3>
              </div>
            </div>
          </div>

          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={handleCloseModal}>
                  &times;
                </span>
                {modalContent === "Pending" && <Pending />}
                {modalContent === "Completed" && <Completed />}
                {modalContent === "Daily" && (
                  <Daily onClose={handleCloseModal} />
                )}
                {modalContent === "Decision" && (
                  <Decision onClose={handleCloseModal} /> 
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
