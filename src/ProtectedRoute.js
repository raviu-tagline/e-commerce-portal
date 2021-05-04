import React from "react";
import { useHistory } from "react-router-dom";

const ProtectedRoute = ({ component: Component, role }) => {
  const history = useHistory();
  //   const token = localStorage.getItem("token");
  const userdata = JSON.parse(localStorage.getItem("user-info"));
  const Role = userdata.role;

  if (role === Role) {
    console.log(role, " -- ", Role);
    return <Component />;
  } else {
    return history.goBack();
  }
};

export default ProtectedRoute;
