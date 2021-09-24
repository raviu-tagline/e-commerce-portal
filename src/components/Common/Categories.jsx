/* eslint-disable */
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import axiosApi from "../../axiosLib";

const Categories = () => {
  const [catData, setCatData] = useState(null);
  const [data, setData] = useState();
  const [show, setShow] = useState(false);

  const showDetails = async (id) => {
    let response = await axiosApi(
      "get",
      process.env.REACT_APP_LOCAL_API_URL + "category/" + id
    );

    if (response.statusCode === 200) {
      setData(response.data);
      setShow(true);
    } else {
      toast.error(
        response.message,
        " with response code ",
        response.statusCode
      );
    }
  };

  const handleClose = () => setShow(false);

  const handleUpdate = async (id) => {};

  const deleteData = (id) => {};

  useEffect(async () => {
    let response = await axiosApi(
      "get",
      process.env.REACT_APP_LOCAL_API_URL + "category"
    );

    if (response.statusCode === 200) {
      const data = response.data;
      setCatData(data);
    } else {
      toast.error(response.message);
    }
  }, []);
  return (
    <React.Fragment>
      <div className="container mx-auto justify-content-center">
        <div className="container-fluid">
          <div className="card mt-5 shadow">
            <div className="card-title">
              <h5 className="card-header">Categories</h5>
            </div>
            <div className="card-body">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Number of Products</th>
                    <th>Images</th>
                    <th colSpan="3">Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {catData ? (
                    catData.map((val, i) => (
                      <tr>
                        {/* <td>{current === 1 ? i + 1 : lastIndex + i}</td> */}
                        <td>{i + 1}</td>
                        <td>{val.name}</td>
                        <td>{val.productCount}</td>
                        <td>
                          <img
                            src={"/images/category_images/" + val.imageName}
                            alt="Image not found"
                          />
                        </td>
                        <td>
                          <span onClick={() => showDetails(val.id)}>
                            <FontAwesomeIcon icon={faEye} />
                          </span>
                        </td>
                        <td>
                          <span onClick={() => handleUpdate(val.id)}>
                            <FontAwesomeIcon icon={faEdit} />
                          </span>
                        </td>
                        <td>
                          <span onClick={() => deleteData(val.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <React.Fragment>
                      <td
                        colSpan="5"
                        style={{
                          textAlign: "center",
                          background: "#f4f4f4",
                        }}
                      >
                        No data found
                      </td>
                    </React.Fragment>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            data && console.log(`data`, Object.keys(data))
            /* <React.Fragment>
            //   <h2>Name: {data.name}</h2>
            //   <h4>Number of products: {data.productCount}</h4>
            //   <img src={"/images/category_images/" + data.imageName} />
            // </React.Fragment>*/
          }
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default Categories;
