import {
  faAngleLeft,
  faAngleRight,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../axiosLib";
import React, { memo, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Links from "../Links";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  deleteUserDetails,
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

  useEffect(() => {
    fetch(process.env.REACT_APP_LOCAL_API_URL + "register?id_ne=1", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json().then((res) => setTotalRec(res.length)));
    setPages(totalRec / limit);

    dispatch(getUserDetails(current, limit));
  }, [dispatch, current, limit]);

  const deleteData = (id) => {
    dispatch(deleteUserDetails(id));
  };

  const handlePrevious = () => {
    setCurrentPage(current - 1);
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
                  {userDetails.length !== 0 ? (
                    userDetails.map((item, i) =>
                      item.role != "admin" ? (
                        <tr>
                          <td>{item.id - 1}</td>
                          <td>{item.name}</td>
                          <td>{item.age}</td>
                          <td>{item.number}</td>
                          <td>{item.email}</td>
                          <td>{item.role}</td>
                          <td>
                            <Links
                              to={"/update/" + item.id}
                              className="text-secondary"
                            >
                              <FontAwesomeIcon icon={faEdit} color="green" />
                            </Links>
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
    </>
  );
};
export default memo(AdminDash);
