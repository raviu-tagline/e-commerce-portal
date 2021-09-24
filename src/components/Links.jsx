import React from "react";
import { NavLink } from "react-router-dom";

const Links = ({ children, to }) => {
  return (
    <React.Fragment>
      <NavLink className="Nav-link" to={to}>
        {children}
      </NavLink>
    </React.Fragment>
  );
};

export default Links;
