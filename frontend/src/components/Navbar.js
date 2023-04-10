import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

function NavigationBar() {

  const {currentUser, logout } = useAuth(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    setIsLoggedIn(!!currentUser);
  }, [currentUser]);

  // const token = localStorage.getItem('token');
  // console.log(token)
  // const currentUser = auth.currentUser;
  // const isLoggedIn = token ? 1 : 0;
  // const isLoggedIn = 0;

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">wrkPR</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Dashboard
          </Nav.Link>
          {!isLoggedIn && (
            <>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>

            </>
          )}
          {isLoggedIn && (

              <Nav.Link as={Link} to="/" onClick={logout}>
                Logout
              </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
