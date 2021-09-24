import React from "react";

const AdminDash = () => {
  return (
    <React.Fragment>
      <div className="container mt-5">
        <div className="container-fluid">
          <div className="row">
            <div className="card col-4 ml-2">
              <div className="card-body">Categories</div>
            </div>
            <div className="card col-4 ml-5">
              <div className="card-body">Sub Categories</div>
            </div>
            <div className="card col-3 ml-4">
              <div className="card-body">Products</div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="card col-4 ml-2">
              <div className="card-body">Users</div>
            </div>
            <div className="card col-4 ml-5">
              <div className="card-body">Total cart items</div>
            </div>
            <div className="card col-3 ml-4">
              <div className="card-body">Total purchase items</div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="card col-6 ml-2">
              <div className="card-body">Total purchase amount</div>
            </div>
            <div className="card col-5 ml-5">
              <div className="card-body">Total remaining stock</div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminDash;
