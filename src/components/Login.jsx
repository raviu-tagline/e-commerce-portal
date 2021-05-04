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

  const onSubmit = async (param) => {
    console.log(param.email);
    const { statusCode, data, message } = await axiosApi(
      "get",
      "register?username=" + param.email + "&password=" + param.password,
      false
    );

    if (statusCode === 200 && data.length > 0) {
      toast.success("login successful", {
        position: "top-center",
      });
      const { token, ...rest } = data;

      // localStorage.setItem("token", token);
      localStorage.setItem("user-info", JSON.stringify(rest));

      if (rest.role === "admin") {
        setPath("admin/dashboard");
      }

      if (rest.role === "supplier") {
        setPath("supplier/dashboard");
      }

      if (rest.role === "customer") {
        setPath("customer/dashboard");
      }

      // setPath(
      //   rest.role === "admin"
      //     ? "admin/dashboard"
      //     : rest.role === "supplier"
      //     ? "supplier/dashboard"
      //     : "customer/dashboard"
      // );

      setChangePath(true);
    } else {
      alert("Check username and password");
    }
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
