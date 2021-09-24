/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import {
  faLaptopMedical,
  faTshirt,
  faFemale,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosApi from "../../axiosLib";

const NavBar = () => {
  const [categories, setCatData] = useState();
  const [subCategories, setSubCatData] = useState();
  useEffect(() => {
    let response;
    async function getCategories() {
      response = await axiosApi(
        "get",
        process.env.REACT_APP_LOCAL_API_URL + "category"
      );

      if (response.statusCode === 200) {
        setCatData(response.data);
      }
    }

    async function getSubCategories() {
      response = await axiosApi(
        "get",
        process.env.REACT_APP_LOCAL_API_URL + "subCategory"
      );

      if (response.statusCode === 200) {
        setSubCatData(response.data);
      }
    }

    getCategories();
    getSubCategories();
  }, []);
  return (
    <React.Fragment>
      <Navbar expand="lg" className="flex-column">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href="/">
              <strong>Home</strong>
            </Nav.Link>
            {categories !== undefined
              ? categories.map((value, index) => (
                  <React.Fragment>
                    <Nav.Link
                      href={
                        "/" +
                        value.name
                          .replace(
                            /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<React.Fragment>\/?~]/,
                            "-"
                          )
                          .toLowerCase()
                      }
                    >
                      <strong> {value.name}</strong>
                    </Nav.Link>
                  </React.Fragment>
                ))
              : ""}
            <NavDropdown title="All sub categories" id="basic-nav-dropdown">
              {subCategories !== undefined
                ? subCategories.map((value, index) => (
                    <React.Fragment>
                      <NavDropdown.Item
                        href={
                          "/" +
                          value.name
                            .replace(
                              /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<React.Fragment>\/?~]/,
                              "-"
                            )
                            .toLowerCase()
                        }
                      >
                        {value.name}
                      </NavDropdown.Item>
                    </React.Fragment>
                  ))
                : ""}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <hr />
    </React.Fragment>
  );
};

export default NavBar;
