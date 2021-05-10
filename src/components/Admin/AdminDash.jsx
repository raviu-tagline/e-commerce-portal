import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../axiosLib";
import React, { Component } from "react";
import { Table } from "react-bootstrap";
import MainHeader from "../../reusableComponents/headers/mainHeader";
import NavBar from "../../reusableComponents/headers/NavBar";
import NavSidebar from "../../reusableComponents/headers/NavSidebar";
import Links from "../Links";

export default class AdminDash extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    this.getApiData();
  }

  deleteData(id) {
    let response;
    async function deleteApiData() {
      response = await axios(
        "delete",
        process.env.REACT_APP_LOCAL_API_URL + "register/" + id
      );

      console.log(response);

      if (response.statusCode === 200) {
        alert("Record deleted");
      }
    }
    if (id != 1) deleteApiData();
    else alert("You can't delete admin profile");
    this.getApiData();
  }

  getApiData() {
    let response;
    async function apiData() {
      response = await axios(
        "get",
        process.env.REACT_APP_LOCAL_API_URL + "register/",
        [],
        false
      );
      if (response.statusCode === 200) {
        return response.data;
      }
    }

    apiData().then((result) => this.setState({ data: result }));
  }
  render() {
    return (
      <>
        <div className="container">
          <div className="container-fluid">
            <div className="card mt-5">
              <div className="card-title">
                <h1 className="text-center">Manage users</h1>
              </div>
              <div className="card-body">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>User Name</th>
                      <th>User age</th>
                      <th>User Mobile</th>
                      <th>User Email</th>
                      <th>User Role</th>
                      <th colSpan="2">Operations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data !== null ? (
                      (console.log(this.state.data === null, this.state.data),
                      this.state.data.map((item, i) =>
                        item.role != "admin" ? (
                          <tr>
                            <td>{i}</td>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            <td>{item.number}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                            <td>
                              <Links to={"/update/" + item.id}>
                                <FontAwesomeIcon icon={faEdit} />
                              </Links>
                            </td>
                            <td>
                              <span onClick={() => this.deleteData(item.id)}>
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  color="blue"
                                  style={{ cursor: "pointer" }}
                                />
                              </span>
                            </td>
                          </tr>
                        ) : (
                          ""
                        )
                      ))
                    ) : (
                      <td
                        colSpan="7"
                        style={{
                          textAlign: "center",
                          background: "#f4f4f4",
                        }}
                      >
                        No data found
                      </td>
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
