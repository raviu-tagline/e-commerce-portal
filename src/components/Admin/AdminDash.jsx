import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    fetch("http://localhost:3001/register/", {
      method: "get",
    }).then((resp) => {
      resp.json().then((res) => {
        this.setState({ data: res });
      });
    });
  }
  render() {
    return (
      <>
        {this.state.data ? (
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
                        {this.state.data.map((item, i) => (
                          <tr>
                            <td>{i + 1}</td>
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
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Please wait.....</p>
        )}
      </>
    );
  }
}
