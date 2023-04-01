import './App.css'
import {BrowserRouter,Route,Routes,Navigate} from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import RecoverPassword from './components/RecoverPassword/RecoverPassword';
import { RequireAuth } from './components/RequireAuth/RequireAuth';

function App() {

  return (
    <div className='App'>
    <BrowserRouter>

      <Routes>
        <Route path="/resetPassword/:code" />
        <Route path="/" element={<Navigate to="/Login" />} />   
        <Route path = "/Login" element={<Login/>}  /> 
        <Route path = "/RecoverPassword" element={<RecoverPassword/>}/>
        
        <Route element = { <RequireAuth /> } >
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path = "/AddUser" element={<Dashboard type="addUser"/>} />
        </Route>

      </Routes>

    </BrowserRouter>
    </div>
    
  )

 }
 export default App;