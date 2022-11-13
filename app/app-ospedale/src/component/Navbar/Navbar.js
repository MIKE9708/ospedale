import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import  './Navbar.css';
import  Logo from  "../../media/images/cross.png" 
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function NavbarOspedale() {

  const {auth} = useAuth();
  // eslint-disable-next-line
  const [user,setUser] = useState(auth.user);


  useEffect(()=>{

  },[auth])

  return (
    <div id= "container-nav">

      <Navbar collapseOnSelect expand="lg" bg="light" variant="light" id="ospedale-navbar" >

      {auth?.user ?  ( <Container style = {{paddingLeft:"1px"}}>

          <Navbar.Brand  href="#home"  >
          <div style = {{height:"35px"}}>
            <div style = {{display: "inline-block"}}>
              <img src = {Logo} alt="logo" style={{width:"40px",heigth:"40px"}}/>  
            </div>
            <div style ={{display: "inline-block"}}>
              <p > Ospedale </p>
            </div>
          </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            
            <Nav className="me-auto">
              <Nav.Link as = {Link} to="/Doctor/Dashboard">I miei pazienti</Nav.Link>
              <Nav.Link as = {Link} to="/Doctor/Dashboard/AddPatient">Aggiungi Pazienti</Nav.Link>
            </Nav>

            <Nav>

              <NavDropdown title={auth.user}  id="collasible-nav-dropdown">
                
                <NavDropdown.Item href="#action/3.2">
                  Esci
                </NavDropdown.Item>

              </NavDropdown>

            </Nav>

          </Navbar.Collapse>

        </Container> )
        :
        (
        <Container>
          <Navbar.Brand href="#home"> 
          <div style = {{height:"35px"}}>
            <div style = {{display: "inline-block"}}>
              <img src = {Logo} alt="logo" style={{width:"40px",heigth:"40px"}}/>  
            </div>
            <div style ={{display: "inline-block"}}>
              <p> Ospedale </p>
            </div>
          </div>
          </Navbar.Brand>
        </Container>
        )
        }

      </Navbar>
     
    </div>
  );
}

export default NavbarOspedale;