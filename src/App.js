
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Pages/Home/Home';
import Dashboard from './Pages/Dashboard/Dashboard';
import Navbar from './Components/Navbar';
import Template from './Pages/Template/Template';
import Report from './Pages/Report/Report';
import Shared from './Pages/Shared/Shared';
import Notification from './Pages/Notification/Notification';
import Tag from './Pages/Tag/Tag'



function App() {
  return (
    <> 
    <BrowserRouter>
  
    <Routes>
      <Route path='/' element={<Home/>}>  </Route>
      <Route path='/Dashboard' element={<Dashboard/>}> </Route>
      <Route path='/Navbar' element={<Navbar/>}> </Route>
      <Route path='Template' element={<Template/>}> </Route>
      <Route path='Reports' element={<Report/>}></Route>
      <Route path='/shared-task' element={<Shared/>}> </Route>
      <Route path='/notification' element={<Notification/>}> </Route> 
      <Route path='Tag' element={<Tag/>}> </Route>
    </Routes>
    </BrowserRouter>
    
    </>
    
  );
}

export default App;

