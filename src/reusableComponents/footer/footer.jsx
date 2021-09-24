import React from "react";

const Footer = () => {
  return (
    <React.Fragment>
      <div className="footer-copyright text-center py-3">
        © 2020 Copyright:
        <a href={`${process.env.REACT_LANDING_PAGE}`}> E-Commerce-Portal</a>
      </div>
    </React.Fragment>
  );
};

export default Footer;
