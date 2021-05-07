import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavLink, Button } from "react-bootstrap";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileImg from "./ProfileImg";
import imgPath from "../../images/default-avtar.png";
// import imgPath from "../../../images/default-avtar.png";
// import logo from "../../../public/logo.png";

const mainHeader = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img
            alt="Logo"
            src={process.env.PUBLIC_URL + "/logo.png"}
            width="30"
            height="30"
            className="d-inline-block align-top mr-2"
          />{" "}
          <strong>E-Commerce-Portal</strong>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link>
              {localStorage.getItem("user-info") === null ? (
                <>
                  <Link to="/">
                    <Button variant="outline-info">
                      <FontAwesomeIcon icon={faSignInAlt} />
                      <strong>&nbsp;Login</strong>
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <ProfileImg path={imgPath} />
                  <Link to="/logout">
                    <Button variant="outline-info">
                      <FontAwesomeIcon icon={faSignOutAlt} />
                      <strong>&nbsp;Logout</strong>
                    </Button>
                  </Link>
                </>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default mainHeader;
