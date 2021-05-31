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
        process.env.REACT_APP_LOCAL_API_URL + "Category"
      );

      if (response.statusCode === 200) {
        setCatData(response.data);
      }
    }

    async function getSubCategories() {
      response = await axiosApi(
        "get",
        process.env.REACT_APP_LOCAL_API_URL + "SubCategory"
      );

      if (response.statusCode === 200) {
        setSubCatData(response.data);
      }
    }

    getCategories();
    getSubCategories();
  }, []);
  return (
    <>
      <Navbar expand="lg" className="flex-column">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href="/">
              <strong>Home</strong>
            </Nav.Link>
            {categories !== undefined
              ? categories.map((value, index) => (
                  <>
                    <Nav.Link
                      href={
                        "/" +
                        value.name
                          .replace(
                            /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
                            "-"
                          )
                          .toLowerCase()
                      }
                    >
                      <strong> {value.name}</strong>
                    </Nav.Link>
                  </>
                ))
              : ""}
            <NavDropdown title="All sub categories" id="basic-nav-dropdown">
              {subCategories !== undefined
                ? subCategories.map((value, index) => (
                    <>
                      <NavDropdown.Item
                        href={
                          "/" +
                          value.name
                            .replace(
                              /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
                              "-"
                            )
                            .toLowerCase()
                        }
                      >
                        {value.name}
                      </NavDropdown.Item>
                    </>
                  ))
                : ""}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <hr />
    </>
  );
};

export default NavBar;
