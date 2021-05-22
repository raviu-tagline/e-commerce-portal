import {
  faAngleLeft,
  faAngleRight,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../axiosLib";
import React, { memo, useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import Links from "../Links";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  deleteUserDetails,
  getSingleUser,
  editUserDetails,
} from "../../redux/actions/userActions";
import axiosApi from "../../axiosLib";

const AdminDash = () => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const [current, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalRec, setTotalRec] = useState(0);
  const [lastIndex, setLastIndex] = useState(limit);
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(getUserDetails(current, limit));
    setLastIndex(limit * current - limit + 1);
  }, [dispatch, current, limit, totalRec, show]);

  const getTotalRec = async () => {
    let response = await axiosApi(
      "get",
      process.env.REACT_APP_LOCAL_API_URL +
        "register?id_ne=1&_sort=role&_order=desc",
      null,
      false
    );

    if (response.statusCode === 200) {
      setTotalRec(response.data.length);
      setPages(Math.ceil(totalRec / limit));
    }
  };

  useEffect(() => {
    getTotalRec();
  }, [totalRec]);

  const deleteData = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUserDetails(id));
      getTotalRec();
    }
  };

  const handleUpdate = async (id) => {
    // dispatch(getSingleUser(id));
    const response = await axiosApi(
      "get",
      process.env.REACT_APP_LOCAL_API_URL + "register/" + id
    );
    if (response.statusCode === 200) {
      setData(response.data);
    }
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handlePrevious = () => {
    setCurrentPage(current - 1);
  };
  const handleSubmit = (params) => {
    dispatch(editUserDetails(params));
    setShow(false);
  };

  const handleNext = () => {
    setCurrentPage(current + 1);
  };
  return (
    <>
      <div className="container mx-auto justify-content-center">
        <div className="container-fluid">
          <div className="card mt-5 shadow">
            <div className="card-title">
              <h1 className="text-center pt-3">Manage users</h1>
            </div>
            <hr
              style={{ width: "96%", alignContent: "center", margin: "auto" }}
            />
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
                  {userDetails.length !== 0 ? (
                    userDetails.map((item, i) =>
                      item.role != "admin" ? (
                        <tr>
                          <td>{current === 1 ? i + 1 : lastIndex + i}</td>
                          <td>{item.name}</td>
                          <td>{item.age}</td>
                          <td>{item.number}</td>
                          <td>{item.email}</td>
                          <td>{item.role}</td>
                          <td>
                            <span onClick={() => handleUpdate(item.id)}>
                              <FontAwesomeIcon icon={faEdit} color="green" />
                            </span>
                          </td>
                          <td>
                            <span onClick={() => deleteData(item.id)}>
                              <FontAwesomeIcon
                                icon={faTrash}
                                color="red"
                                style={{ cursor: "pointer" }}
                              />
                            </span>
                          </td>
                        </tr>
                      ) : (
                        ""
                      )
                    )
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
              <Button
                className="rounded-circle"
                variant="secondary"
                onClick={() => handlePrevious()}
                disabled={current === 1 ? "true" : ""}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </Button>
              <Button
                className="rounded-circle float-right"
                variant="secondary"
                onClick={() => handleNext()}
                disabled={current === pages ? "true" : ""}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {data && (
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={data.name}
                  onChange={(e) => {
                    setData({
                      ...data,
                      name: e.target.value,
                    });
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  value={data.age}
                  onChange={(e) => {
                    setData({
                      ...data,
                      age: Number(e.target.value),
                    });
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Number</Form.Label>
                <Form.Control
                  type="number"
                  value={data.number}
                  onChange={(e) => {
                    setData({
                      ...data,
                      number: e.target.value,
                    });
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Role</Form.Label>
                <Form.Control type="text" value={data.role} disabled={true} />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" value={data.email} disabled={true} />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleSubmit(data)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default memo(AdminDash);
