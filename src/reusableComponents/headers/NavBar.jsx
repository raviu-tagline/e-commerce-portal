import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import {
  faLaptopMedical,
  faTshirt,
  faFemale,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = () => {
  return (
    <>
      <Navbar expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link href="/">
              <strong>Home</strong>
            </Nav.Link>
            <Nav.Link href="/electronics">
              <strong>
                <FontAwesomeIcon icon={faLaptopMedical} /> Electronics
              </strong>
            </Nav.Link>
            <Nav.Link href="/menfashion">
              <strong>
                <FontAwesomeIcon icon={faTshirt} /> Men's fashion
              </strong>
            </Nav.Link>
            <Nav.Link href="/womenfashion">
              <strong>
                <FontAwesomeIcon icon={faFemale} /> Women's fashion
              </strong>
            </Nav.Link>
            <NavDropdown title="All categories" id="basic-nav-dropdown">
              <NavDropdown.Item href="/electronics">
                Electronics
              </NavDropdown.Item>
              <NavDropdown.Item href="/menfashion">
                Men's Fashion
              </NavDropdown.Item>
              <NavDropdown.Item href="/womenfashion">
                Women's fashion
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
