import React, { useState, useEffect } from "react";
import axiosApi from "../axiosLib";
import loginDesign from "../reusableContents/loginDesign";
import Forms from "../reusableComponents/Form";
import History from "../reusableContents/history";
import Links from "./Links";
// import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = (props) => {
  const [changePath, setChangePath] = useState(false);
  const [path, setPath] = useState("/");

  console.log(props);

  const onSubmit = async (e, param) => {
    e.preventDefault();
    console.log(param);

    const { statusCode, message } = await axiosApi(
      "get",
      "login",
      param,
      false
    );
  };
  return (
    <>
      <div className="container">
        <div className="container-fluid col-6 mt-5">
          <div className="card">
            <div className="card-title text-center">
              <h1>Login here</h1>
            </div>
            <div className="card-body">
              <Forms content={loginDesign} onSubmit={(e) => onSubmit(e)} />
              <hr />
              <p className="text-center">
                <Links className="btn btn-success" to="/create">
                  <strong>Create new account</strong>
                </Links>
              </p>
            </div>
          </div>
        </div>
        {changePath && <History path={path} />}
      </div>
    </>
  );
};

export default Login;
