import React from "react";
import {BrowserRouter,Routes,Route,Outlet } from "react-router-dom";



import AdminHome from './Pages/admin/Home/Home';
import AdminDashboard from './Pages/admin/Dashboard/Dashboard';
import AdminNavbar from './Pages/admin/Navbar/Navbar'
import AdminTemplate from './Pages/admin/Template/Template';
import AdminNotification from './Pages/admin/Notification/Notification';
import AdminTag from './Pages/admin/Tag/Tag';
import AdminDetails from "./Pages/admin/Details/Details";
import AdminSettings from './Pages/admin/Settings/Settings'
import AdminChecklist from './Pages/admin/Checklist/Checklist'


import UserHome from "./Components/User/Home/Home";
import UserNavbar from "./Components/User/Navbar/Navbar";
import UserAssigned from "./Components/User/Daily/Daily";
import UserPriority from "./Components/User/Assigned/Assigned";
import UserPending from "./Components/User/Pending/Pending";
import UserSettings from "./Components/User/Settings/Settings";
import UserNotification from "./Components/User/Notification/Notification";
import UserComplete from "./Components/User/Complete/Complete";
import UserView from "./Components/User/View/View";
import UserLogin1 from "./Components/User/Login1/Login1";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          
          

          <Route path="user" element={<Outlet />}>
            <Route path="dashboard" element={<UserHome />} />
            <Route path="Navbar" element={<UserNavbar />} />
            <Route path="Assigned" element={<UserAssigned />} />
            <Route path="Priority" element={<UserPriority />} />
            <Route path="Pending" element={<UserPending />} />
            <Route path="Complete" element={<UserComplete />} />
            <Route path="Notification" element={<UserNotification />} />
            <Route path="Settings" element={<UserSettings />} />
            <Route path="View" element={<UserView />} />
            <Route path="Login1" element={<UserLogin1/>}/> 
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
