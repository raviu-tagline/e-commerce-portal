import React, { useState, useEffect } from "react";
import axiosApi from "../axiosLib";
import loginDesign from "../reusableContents/loginDesign";
import Forms from "../reusableComponents/Form";
import History from "../reusableContents/history";
import Links from "./Links";
import { Redirect } from "react-router-dom";
// import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = (props) => {
  const [changePath, setChangePath] = useState(false);
  const [path, setPath] = useState("/");

  const onSubmit = async (param) => {
    const { statusCode, data, message } = await axiosApi(
      "get",
      process.env.REACT_APP_LOCAL_API_URL +
        "register?email=" +
        param.email +
        "&password=" +
        param.password,
      false
    );

    if (statusCode === 200 && data.length > 0) {
      // toast.success("login successful", {
      //   position: "top-right",
      // });

      const rest = { ...data };
      // localStorage.setItem("token", token);
      localStorage.setItem("user-info", JSON.stringify(data));
      setPath(rest[0].role + "/dashboard");
      setChangePath(true);
    } else {
      alert("Check username and password");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      const useData = JSON.parse(localStorage.getItem("user-info"));
      setPath(useData[0].role + "/dashboard");
      setChangePath(true);
    }
  }, []);
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
                <div className="btn btn-success">
                  <Links to="/create">
                    <strong>Create new account</strong>
                  </Links>
                </div>
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
