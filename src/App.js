
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Dashboard from './Pages/Dashboard/Dashboard';
import Navbar from './Components/Navbar';
import Template from './Pages/Template/Template';
import Checklist from './Pages/Checklist/Checklist';
import Reports from './Components/Reports/Report';






function App() {
  return (
    <> 
    <BrowserRouter>
  
    <Routes>
      <Route path='/' element={<Home/>}>  </Route>
      <Route path='/Dashboard' element={<Dashboard/>}> </Route>
      <Route path='/Navbar' element={<Navbar/>}> </Route>
      <Route path='Template' element={<Template/>}> </Route>
      <Route path='Checklist' element={<Checklist/>}> </Route>
      <Route path='Reports' element={<Reports/>}></Route>
      
      
      
   
    </Routes>
    </BrowserRouter>
  

    
    </>
    
    
  );
}

export default App;

