import './App.css'
import {BrowserRouter,Route,Routes,Navigate} from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import RecoverPassword from './components/RecoverPassword/RecoverPassword';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import PersistLogin from './components/PersistLogin/PersistLogin';
import ValidateAdmin from './components/ValidateAdmin/ValidateAdmin';
import CheckDevice from './components/check_device/Check_device';
import UpdateData from './components/UpdateDate/UpdateData';

function App() {

  return (
    <div className='App'>
    <BrowserRouter>

      <Routes>
        <Route path="/resetPassword/:code" />
        <Route path="/" element={<Navigate to="/Dashboard" />} />   
        <Route path = "/Login" element={<Login/>}  /> 
        <Route path = "/DeviceCheck" element={<CheckDevice/>}  /> 

        <Route path = "/RecoverPassword" element={<RecoverPassword/>}/>
        <Route path = "/activate/:code" element={<ValidateAdmin/>}/>

        <Route element = {<PersistLogin />} >
          <Route element = { <RequireAuth /> } >
            <Route path="/Dashboard" element={<Dashboard/>}/>
            <Route path = "/AddUser" element={<Dashboard type="addUser"/>} />
            <Route path = "/UpdateData/:id" element={<UpdateData />} />
          </Route>
        </Route>

      </Routes>

    </BrowserRouter>
    </div>
    
  )

 }
 export default App;