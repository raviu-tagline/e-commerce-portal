import React, { useState } from "react";
import axiosApi from "../axiosLib";
import Links from "./Links";
import registerDesign from "../reusableContents/registerDesign";
import Forms from "../reusableComponents/Form";
import History from "../reusableContents/history";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [changePath, setChangePath] = useState(false);
  const [path, setPath] = useState("/");

  const onSubmit = async (params) => {
    const { data, statusCode, message } = await axiosApi(
      "post",
      "register",
      params,
      false
    );

    if (statusCode === 201) {
      alert("Record created");
      setPath("/");
      setChangePath(true);
    } else {
      alert(message);
    }
  };

  return (
    <>
      <div className="container">
        <div className="container-fluid col-6 mt-5">
          <div className="card">
            <div className="card-title mt-3 text-center">
              <h1>Register Here</h1>
            </div>

            <div className="card-body">
              <Forms content={registerDesign} onSubmit={onSubmit} />
              <hr />
              <p className="text-center">
                Already have an account? <Links to="/">Login Here</Links>
              </p>
            </div>
          </div>
        </div>
        {changePath && <History path={path} />}
      </div>
    </>
  );
};

export default Register;
