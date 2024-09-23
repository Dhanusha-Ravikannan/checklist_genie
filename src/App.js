
import './App.css';
import {BrowserRouter,Routes,Route, Outlet} from 'react-router-dom';
import AdminHome from './Pages/admin/Home/Home';
import AdminDashboard from './Pages/admin/Dashboard/Dashboard';
import AdminNavbar from './Components/Navbar';
import AdminTemplate from './Pages/admin/Template/Template';
import AdminReport from './Pages/admin/Report/Report';
import AdminShared from './Pages/admin/Shared/Shared';
import AdminNotification from './Pages/admin/Notification/Notification';
import AdminTag from './Pages/admin/Tag/Tag';



function App() {
  return (
    <> 
    <BrowserRouter>
  
    <Routes>
      <Route index element={<AdminHome/>}/>  
      <Route path='admin' element={<Outlet/>}>
      <Route path='dashboard' element={<AdminDashboard/>}/> 
      <Route path='navbar' element={<AdminNavbar/>}/> 
      <Route path='template' element={<AdminTemplate/>}/> 
      <Route path='reports' element={<AdminReport/>}/>
      <Route path='shared-task' element={<AdminShared/>}/> 
      <Route path='notification' element={<AdminNotification/>}/>  
      <Route path='tag' element={<AdminTag/>}/> 
      </Route>
    </Routes>
    </BrowserRouter>
    
    </>
    
  );
}

export default App;

