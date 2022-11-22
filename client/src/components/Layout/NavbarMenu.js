import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import TodoLogo from "../../assets/ToDo.png";
import OutIcon from "../../assets/OutIcon.svg";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import React from "react";

const NavbarMenu = () => {
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useContext(AuthContext);
  const logout = () => logoutUser();
  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
      <Navbar.Brand className="font-weight-bolder text-white ">
        <img
          src={TodoLogo}
          alt="TodoLogo"
          width="32"
          height="32"
          className="mr-2"
        />
        TODO LIST
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/dashboard"
            as={Link}
          >
            Dashboard
          </Nav.Link>
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/about"
            as={Link}
          >
            About
          </Nav.Link>
        </Nav>
        <Navbar.Collapse className=" justify-content-end">
          <Nav>
            <Nav.Link className="font-weight-bolder text-white" disabled>
              Welcome {username}
            </Nav.Link>
            <Button
              variant="secondary"
              className="font-weight-bolder text-white"
              onClick={logout}
            >
              <img
                src={OutIcon}
                alt="logoutIcon"
                width="32"
                height="32"
                className="mr-2"
              />
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMenu;
