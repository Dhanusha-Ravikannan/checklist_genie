import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./TemplateRecipients.css";
import axios from "axios";
import Navbar from "../../../Pages/admin/Navbar/Navbar";

const TemplateRecipients = () => {
  const token = localStorage.getItem("token");
  const { templateId } = useParams();
  const [recipients, setRecipients] = useState([]);
  const [newRecipient, setNewRecipient] = useState({ email: "", type: "to" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRecipients();
  }, [templateId]);

  const fetchRecipients = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/templaterecepients/getreceipients/${templateId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRecipients(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch recipients. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecipient = async () => {
    if (!newRecipient.email) {
      setError("Email is required");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/templaterecepients/${templateId}/recipients`,
        {
          recipients: [newRecipient],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewRecipient({ email: "", type: "to" });
      fetchRecipients();
      setError("");
    } catch (err) {
      setError(
        "Failed to add recipient. Please check the email and try again."
      );
    }
  };

  const handleRemoveRecipient = async (recipientId) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/templaterecepients/recipients/${recipientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchRecipients();
      setError("");
    } catch (err) {
      setError("Failed to remove recipient. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="recipients-container">
        <h2 className="recipients-title">Template Recipients</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="add-recipient-section">
          <h3 className="section-title">Add New Recipient</h3>
          <div className="recipient-form">
            <input
              type="email"
              value={newRecipient.email}
              onChange={(e) =>
                setNewRecipient({ ...newRecipient, email: e.target.value })
              }
              placeholder="Enter email address"
              className="email-input"
            />
            <select
              value={newRecipient.type}
              onChange={(e) =>
                setNewRecipient({ ...newRecipient, type: e.target.value })
              }
              className="type-select"
            >
              <option value="to">To</option>
              <option value="cc">CC</option>
              <option value="bcc">BCC</option>
            </select>
            <button
              onClick={handleAddRecipient}
              className="add-button"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </div>

        <div className="current-recipients-section">
          <h3 className="section-title">Current Recipients</h3>
          {loading ? (
            <p className="loading-message">Loading recipients...</p>
          ) : recipients.length === 0 ? (
            <p className="empty-message">No recipients added yet</p>
          ) : (
            <ul className="recipients-list">
              {recipients.map((recipient) => (
                <li key={recipient.id} className="recipient-item">
                  <div className="recipient-info">
                    <span className="recipient-email">
                      {recipient.recipient_email}
                    </span>
                    <span className="recipient-type">
                      ({recipient.cc_bcc_emails})
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveRecipient(recipient.id)}
                    className="remove-button"
                    disabled={loading}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default TemplateRecipients;
