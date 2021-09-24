import React from "react";

const Loader = () => {
  return (
    <React.Fragment>
      <div className="text-primary mx-auto mt-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Loader;
