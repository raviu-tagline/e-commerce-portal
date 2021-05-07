import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const ProtectedRoute = (props) => {
  const history = useHistory();

  let Cmp = props.component;
  let role = props.role;
  let userData = JSON.stringify(localStorage.getItem("user-info"));

  useEffect(() => {
    if (!localStorage.getItem("user-info")) {
      console.log("hello");
      history.push("/");
    }
  }, []);
  return (
    <>
      <Cmp />
    </>
  );
};

export default ProtectedRoute;
