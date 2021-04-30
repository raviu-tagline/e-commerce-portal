import React, { useState } from "react";
// import axiosApi from "../axios";
// import Links from "../reusableComponents/Links";
import loginDesign from "../reusableContents/loginDesign";
import Forms from "../reusableComponents/Form";
import History from "../reusableContents/history";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = (props) => {
  console.log("props in signIn -- ", props);
  // const [changePath, setChangePath] = useState(false);
  // const [path, setPath] = useState("/");

  // const onSubmit = async (param) => {
  //   const { status, data, message } = await axiosApi(
  //     "post",
  //     "user/login/",
  //     param,
  //     false
  //   );

  //   if (status === 200) {
  //     toast.success("login successful", {
  //       position: "top-center",
  //     });

  //     const { token, ...rest } = data;
  //     localStorage.setItem("token", token);
  //     localStorage.setItem("user-data", JSON.stringify(rest));

  //     setPath(
  //       rest.role === "teacher" ? "teacher/dashboard" : "student/dashboard"
  //     );

  //     setChangePath(true);
  //   } else {
  //     toast.error(message, {
  //       position: "top-center",
  //     });
  //   }
  // };

  return (
    <>
      <div className="container">
        <div className="container-fluid col-6 mt-5">
          <div classNam="card">
            <div className="card-title">
              <h1>Login here</h1>
            </div>
            <div className="card-body">
              <Forms content={loginDesign} />
              <hr />
              <Link className="btn btn-success" to="/create">
                <strong>Create new account</strong>
              </Link>
            </div>
          </div>
        </div>
        {/* {changePath && <History path={path} />} */}
      </div>
    </>
  );
};
export default Login;
