import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import MainHeader from "./reusableComponents/headers/mainHeader";
import NavSidebar from "./reusableComponents/headers/NavSidebar";

const ProtectedRoute = (props) => {
  const history = useHistory();

  console.log(props);

  let Cmp = props.component;
  let path = props.path;
  let role = props.role;
  let userData = JSON.stringify(localStorage.getItem("user-info"));

  useEffect(() => {
    if (!localStorage.getItem("user-info")) {
      history.push("/");
    }
  }, []);
  return (
    <>
      <MainHeader />
      {path == "/home" ? (
        <>
          <Cmp />
        </>
      ) : (
        <>
          <NavSidebar />
        </>
      )}
    </>
  );
};

export default ProtectedRoute;
