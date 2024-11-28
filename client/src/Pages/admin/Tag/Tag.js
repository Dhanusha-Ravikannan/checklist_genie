
import React, { useState } from "react";
import axios from "axios";
import "../../admin/Tag/Tag.css";
import Navbar from "../../../Pages/admin/Navbar/Navbar";

const Tag = () => {
  const [saved, setSaved] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [tagName, setTagName] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("");
  const [applicableTeam, setApplicableTeam] = useState("");

  const teams = [
    "FULL_STACK_DEVELOPER",
    "POWER_BI_DEVELOPER",
    "SALES",
    "TESTING",
    "HUMAN_RESOURCE",
    "PUBLIC",
  ];

  const handleDelete = () => {
    setDeleted(true);
    setTimeout(() => setDeleted(false), 3000);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const tag = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/tags/createTags`,
        {
          tag_name: tagName,
          description,
          frequency,
          user_position: applicableTeam,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Tag created:", tag.data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Error saving tag:", error);
    }
  };

  return (
    <>
      <div className="dashboard-container">
        <Navbar />
        <h3 className="tag-pos">Tags</h3>
        {saved && <div className="alert-message">Saved Successfully!</div>}
        {deleted && <div className="alert-message">Deleted Successfully!</div>}
        <div className="notification-container">
          <div className="notification-header">
            <h2 className="tag-position">Tags</h2>
          </div>
          <div className="tag-form">
            <div className="form-row">
              <label>Tag Name</label>
              <input
                type="text"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
              />
            </div>
            <div className="form-row">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-row">
              <label>Frequency</label>
              <input
                type="text"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              />
            </div>
            <div className="form-row">
              <label>Applicable Team</label>
              <select
                value={applicableTeam}
                onChange={(e) => setApplicableTeam(e.target.value)}
              >
                <option value="" disabled>
                  Select a team
                </option>
                {teams.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="del">
            <button>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tag;
