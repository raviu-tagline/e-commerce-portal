import {
  faAngleLeft,
  faAngleRight,
  faEdit,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  deleteUserDetails,
  editUserDetails,
} from "../../redux/actions/userActions";
import axiosApi from "../../axiosLib";
import { toast } from "react-toastify";

const Users = () => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const [current, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalRec, setTotalRec] = useState(0);
  const [lastIndex, setLastIndex] = useState(limit);
  const [show, setShow] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isUpdate, setUpdate] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(getUserDetails(current, limit));
    setLastIndex(limit * current - limit + 1);
    if (localStorage.getItem("user-info")) {
      setUserInfo(JSON.parse(localStorage.getItem("user-info")));
    }

    if (isUpdate) {
      dispatch(getUserDetails(current, limit));
      setUpdate(false);
      toast.success(`Record updated successfully`);
    }
  }, [dispatch, current, limit, totalRec, show, visible]);

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

  const showDetails = async (id) => {
    const response = await axiosApi(
      "get",
      process.env.REACT_APP_LOCAL_API_URL + "register/" + id
    );
    if (response.statusCode === 200) {
      setData(response.data);
    }
    setVisible(true);
  };

  const handleClose = () => {
    setShow(false);
    setVisible(false);
  };

  const handlePrevious = () => {
    setCurrentPage(current - 1);
  };
  const handleSubmit = (params) => {
    dispatch(editUserDetails(params));
    setShow(false);
    setUpdate(true);
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
              <h5 className="card-header">Manage users</h5>
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
                    {userInfo && userInfo.role == "admin" && (
                      <th colSpan="3">Operations</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {userDetails.length !== 0 ? (
                    userDetails.map((item, i) => (
                      <tr>
                        {item.role != "admin" ? (
                          <>
                            <td>{current === 1 ? i + 1 : lastIndex + i}</td>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            <td>{item.number}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                            {userInfo && userInfo.role == "admin" && (
                              <>
                                <td>
                                  <span onClick={() => showDetails(item.id)}>
                                    <FontAwesomeIcon icon={faEye} />
                                  </span>
                                </td>
                                <td>
                                  <span onClick={() => handleUpdate(item.id)}>
                                    <FontAwesomeIcon icon={faEdit} />
                                  </span>
                                </td>
                                <td>
                                  <span onClick={() => deleteData(item.id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                  </span>
                                </td>
                              </>
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </tr>
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

      <Modal show={visible} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {data && (
            <>
              <h2>{data.name}</h2>
              <h4>{data.email}</h4>
              <h4>{data.role}</h4>
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* <Modal show={visible} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {data && (
            <>
              <h2>{data.name}</h2>
              <h4>{data.email}</h4>
              <h4>{data.role}</h4>
            </>
          )}
        </Modal.Body>
      </Modal> */}
    </>
  );
};
export default memo(Users);
