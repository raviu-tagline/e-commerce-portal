import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavLink, Button } from "react-bootstrap";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import History from "../../reusableContents/history";

const MainHeader = () => {
  let RenderComp = null;
  const [path, setPath] = useState("/");
  const [changePath, setChangePath] = useState(false);
  function handleClick() {
    if (localStorage.getItem("user-info")) {
      localStorage.clear();
      toast.success("Logout successfully");
      setChangePath(true);
    }
  }

  if (localStorage.getItem("user-info")) {
    const userData = JSON.parse(localStorage.getItem("user-info"));
    RenderComp = (
      <>
        <Nav.Link>
          <Link to={"/" + userData.role + "/dashboard"}>
            <img src="/images/default-avtar.png" className="profile-image" />
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
      {changePath && <History path={path} />}
    </>
  );
};

export default MainHeader;
