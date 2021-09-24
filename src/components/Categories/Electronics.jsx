import React, { useEffect } from "react";
import axiosApi from "../../axiosLib";

export const Electronics = () => {
  useEffect(() => {
    let response;
    async function fetchElectronicsData() {
      response = await axiosApi(
        "get",
        process.env.REACT_APP_LOCAL_API_URL + "category/1"
      );
    }

    fetchElectronicsData();
  }, []);
  return (
    <React.Fragment>
      <h1>Electronics</h1>
    </React.Fragment>
  );
};
