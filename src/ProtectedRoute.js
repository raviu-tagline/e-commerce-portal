import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import MainHeader from "./reusableComponents/headers/mainHeader";
import NavSidebar from "./reusableComponents/headers/NavSidebar";
import NavBar from "./reusableComponents/headers/NavBar";
import Footer from "./reusableComponents/footer/Footer";

const ProtectedRoute = (props) => {
  const history = useHistory();

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
      {path == "/" ? (
        <>
          <Cmp />
        </>
      ) : (
        <>
          <NavSidebar />
          <Cmp />
        </>
      )}
      <Footer />
    </>
  );
};

export default ProtectedRoute;
