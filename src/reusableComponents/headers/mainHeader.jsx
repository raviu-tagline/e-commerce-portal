import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavLink, Button } from "react-bootstrap";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileImg from "./ProfileImg";
import imgPath from "../../images/default-avtar.png";
// import imgPath from "../../../images/default-avtar.png";
// import logo from "../../../public/logo.png";

const MainHeader = () => {
  let RenderComp = null;
  function handleClick() {
    localStorage.clear();
  }

  if (localStorage.getItem("user-info")) {
    const userData = JSON.parse(localStorage.getItem("user-info"));
    RenderComp = (
      <>
        <Nav.Link>
          <Link to={"/" + userData.role + "/dashboard"}>
            <ProfileImg path={imgPath} />
          </Link>
          <Link to="/">
            <Button variant="outline-info" onClick={handleClick}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              <strong>&nbsp;Logout</strong>
            </Button>
          </Link>
        </Nav.Link>
      </>
    );
  } else {
    RenderComp = (
      <>
        <Nav.Link>
          <Link to="/login">
            <Button variant="outline-info" onClick={handleClick}>
              <FontAwesomeIcon icon={faSignInAlt} />
              <strong>&nbsp;Login</strong>
            </Button>
          </Link>
        </Nav.Link>
      </>
    );
  }
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
          <Nav>{RenderComp}</Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default MainHeader;
