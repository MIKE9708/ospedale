import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from 'cdbreact';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import useAuth from '../../hooks/useAuth';
import useLogout from '../../hooks/useLogout';
import useData from '../../hooks/useData';

const Sidebar = () => {
  // eslint-disable-next-line
  const {auth,setAuth} = useAuth();
  const data = useData();
  const logout = useLogout();
  console.log(auth);
  const logoutUser = ()=> {
    setAuth(() => undefined);
    data.setPatients(()=>undefined);
    data.setDoctors(()=>undefined)
    logout();


  }

    return (
      <div style={{ display: 'flex', height: '100%', overflow: 'scroll initial' }}>
        <CDBSidebar textColor="#fff" backgroundColor="#333">
          <CDBSidebarHeader className="element"prefix={<i className="fa fa-bars fa-large"></i>}>
            <p>
              {auth?.user!==undefined?(auth.user):('')}
            </p>
          </CDBSidebarHeader>
  
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink  to="/" >
                <CDBSidebarMenuItem className="element" icon="home">Home</CDBSidebarMenuItem>
              </NavLink>
              <NavLink  to="/addUser" >
                <CDBSidebarMenuItem className="element" icon="user">Aggiungi Utente</CDBSidebarMenuItem>
              </NavLink>
                <CDBSidebarMenuItem className="element" icon="unlock"  onClick={ () => logoutUser() }>Logout</CDBSidebarMenuItem>
  
            </CDBSidebarMenu>
          </CDBSidebarContent>
  
          <CDBSidebarFooter style={{ textAlign: 'center' }}>

          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    );
  };
  
  export default Sidebar;
  
