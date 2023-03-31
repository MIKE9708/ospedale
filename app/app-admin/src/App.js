import './App.css'
import {BrowserRouter,Route,Routes,Navigate} from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';

function App() {

  return (
      
    <BrowserRouter>

      <Routes>
      <Route path="/Dashboard" element={<Dashboard/>}/>
      <Route path = "/AddUser" element={<Dashboard type="addUser"/>} />
        <Route path="/RecoverPassword"/>
        <Route path="/resetPassword/:code" />
        <Route path="/" element={<Navigate to="/Dashboard" />} />   
        <Route path = "/Login" element={<Login/>}  /> 
        <Route path="*"  />
      </Routes>

    </BrowserRouter>
    
  )

 }
 export default App;