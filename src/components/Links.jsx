import React from "react";
import { NavLink } from "react-router-dom";

const Links = ({ children, to }) => {
  return (
    <>
      <NavLink className="Nav-link" to={to}>
        {children}
      </NavLink>
    </>
  );
};

export default Links;
