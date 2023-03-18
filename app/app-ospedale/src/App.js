import './App.css';
import Login from './component/Login/Login';
import NavbarOspedale from './component/Navbar/Navbar';
import {BrowserRouter,Route,Routes,Navigate} from "react-router-dom";
import { RequireAuth } from './component/Auth/RequireAuth';
import PersistLogin from './component/Login/PersistLogin';
import roles from './roles/role';
import DoctorDashboard from './component/DoctorDashboard/DoctorDashboard';
import PatientDashboard from './component/PatientDashboard/PatientDashboard';
import AddPatient from './component/AddPatient.js/AddPatient';
import NotFound from './component/NotFound/NotFound';
import RecoverPassword from './component/RecoverPassword/RecoverPassword';
import ResetPassword from './component/ResetPassword/ResetPassword';

function App() {
  return (

    <div className="App">
      
      <BrowserRouter>

        <NavbarOspedale/>

        <Routes>

          <Route path = "/Doctor/login" element = { <Login role = {["doctor"]} /> } />
          <Route path="/RecoverPassword" element={<RecoverPassword />} />
          <Route path="/resetPassword/:code" element={<ResetPassword/>}/>
          <Route path="/" element={<Navigate to="/login" />} />   
      
          <Route path = "/login" element = { <Login role = { ["patient"] } /> } /> 

          <Route element = {<PersistLogin />} >
          
            <Route element = { <RequireAuth allowedRoles = { [ roles[0] ] }/> } >
              <Route path="/Doctor/Dashboard"  element = {<DoctorDashboard />} />
            </Route>
            
            <Route element = { <RequireAuth allowedRoles = { [ roles[0] ] }/> } >
              <Route path="/Doctor/Dashboard/AddPatient" element = {<AddPatient/>} />
            </Route>

            <Route element = { <RequireAuth allowedRoles = { [ roles[1] ] }/> } >
              <Route path="/Patient/Dashboard"  element = {<PatientDashboard />} />
            </Route>

          </Route>

          <Route path="*" element={<NotFound />}/>
        </Routes>

      </BrowserRouter>
      
    </div>


  );
}

export default App;
