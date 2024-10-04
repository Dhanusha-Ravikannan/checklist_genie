import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import AdminHome from "./Pages/admin/Home/Home";
import AdminDashboard from "./Pages/admin/Dashboard/Dashboard";
import AdminNavbar from "./Pages/admin/Navbar/Navbar";
import AdminTemplate from "./Pages/admin/Template/Template";
import AdminNotification from "./Pages/admin/Notification/Notification";
import AdminTag from "./Pages/admin/Tag/Tag";
import AdminDetails from "./Pages/admin/Details/Details";
import AdminSettings from "./Pages/admin/Settings/Settings";
import AdminChecklist from "./Pages/admin/Checklist/Checklist";

import UserPending from "./Components/User/Pending/Pending";
import UserSettings from "./Components/User/Settings/Settings";
import UserSidebar from "./Components/User/Sidebar/Sidebar";
import UserNotification from "./Components/User/Notification/Notification";
import UserComplete from "./Components/User/Complete/Complete";
import UserBrowse from "./Components/User/Browse/Browse";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="user" element={<Outlet />}>
            <Route path="sidebar" element={<UserSidebar />} />
            <Route path="browse" element={<UserBrowse />} />
            <Route path="pending" element={<UserPending />} />
            <Route path="complete" element={<UserComplete />} />
            <Route path="notification" element={<UserNotification />} />
            <Route path="settings" element={<UserSettings />} />
          </Route>
        </Routes>

        <Routes>
          <Route index element={<AdminHome />} />
          <Route path="admin" element={<Outlet />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="navbar" element={<AdminNavbar />} />
            <Route path="template" element={<AdminTemplate />} />
            <Route path="notification" element={<AdminNotification />} />
            <Route path="tag" element={<AdminTag />} />
            <Route path="details" element={<AdminDetails />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="checklist" element={<AdminChecklist />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
