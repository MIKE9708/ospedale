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

const Sidebar = () => {
    return (
      <div style={{ display: 'flex', height: '100%', overflow: 'scroll initial' }}>
        <CDBSidebar textColor="#fff" backgroundColor="#333">
          <CDBSidebarHeader className="element"prefix={<i className="fa fa-bars fa-large"></i>}>
            <p>
              Dashboard
            </p>
          </CDBSidebarHeader>
  
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="element" icon="home">Home</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/addUser" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="element" icon="user">Aggiungi Utente</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/logout" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="element" icon="unlock" >Logout</CDBSidebarMenuItem>
              </NavLink>
  
            </CDBSidebarMenu>
          </CDBSidebarContent>
  
          <CDBSidebarFooter style={{ textAlign: 'center' }}>

          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    );
  };
  
  export default Sidebar;
  
