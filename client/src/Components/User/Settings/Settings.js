
import React, { useState } from "react";
import "./Settings.css";
import Sidebar from "../../../Components/User/Sidebar/Sidebar";

const Settings = () => {
  const [lightMode, setLightMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState("Medium");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [reminderTiming, setReminderTiming] = useState("Minutes");
  const [passwordProtection, setPasswordProtection] = useState(false);
  const [showAccount, setShowAccount] = useState(true);

  const handleSave = () => {
    alert("Changes saved!");
  };

  const handleCancel = () => {
    alert("Changes canceled!");
  };

  const handleLightModeChange = () => {
    setLightMode(true);
    setDarkMode(false);
  };

  const handleDarkModeChange = () => {
    setLightMode(false);
    setDarkMode(true);
  };

  return (
    <>
  <Sidebar/>
      <div className="settings-container">
        <header className="settings-header">
          <h1>Settings</h1>
          <input
            type="text"
            placeholder="Search Settings"
            className="search-bar"
          />
        </header>

        <section className="settings-section">
          <h2>My Account</h2>
          <button
            onClick={() => setShowAccount(!showAccount)}
            className="toggle-button"
          >
            {showAccount ? "Hide Profile" : "Show Profile"}
          </button>
          {showAccount && (
            <div className="account-info">
              <p>Name: John</p>
              <p>Email: john@example.com</p>
            </div>
          )}
          <button className="edit-button">Edit Profile</button>
          <button className="change-password-button">Change Password</button>
        </section>

        <section className="settings-section">
          <h2>General</h2>
          <label>
            <input
              type="checkbox"
              checked={lightMode}
              onChange={handleLightModeChange}
            />
            Light Mode
          </label>
          <label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={handleDarkModeChange}
            />
            Dark Mode
          </label>
          <label>
            Font Size:
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
            >
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </label>
        </section>

        <section className="settings-section">
          <h2>Notifications</h2>
          <div className="notifications-settings">
            <label className="switch">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              />
              <span className="slider"></span>
            </label>
            <label>Enable Notifications</label>
          </div>
          {notificationsEnabled && (
            <div className="reminder-settings">
              <label>
                Reminder Timing:
                <select
                  value={reminderTiming}
                  onChange={(e) => setReminderTiming(e.target.value)}
                  className="reminder-dropdown"
                >
                  <option value="Minutes">Minutes</option>
                  <option value="Hours">Hours</option>
                  <option value="Days">Days</option>
                </select>
              </label>
              <p className="reminder-description">
                Choose how frequently you would like to receive reminders.
              </p>
            </div>
          )}
        </section>

        <section className="settings-section">
          <h2>Privacy & Security</h2>
          <label>
            <input
              type="checkbox"
              checked={passwordProtection}
              onChange={() => setPasswordProtection(!passwordProtection)}
            />
            Enable Password Protection
          </label>
        </section>

        <footer className="settings-footer">
          <button onClick={handleSave} className="save-button">
            Save Changes
          </button>
          <button onClick={handleCancel} className="cancel-button">
            Cancel
          </button>
        </footer>
      </div>
    </>
  );
};

export default Settings;
