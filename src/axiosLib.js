/* eslint-disable */
import axios from "axios";
import { useHistory } from "react-router-dom";

// , data, isToken = false

const axiosApi = (method, apiUrl, data, isToken) =>
  new Promise((resolve, reject) => {
    let headers = {
      "Content-Type": "application/json",
    };
    // const history = useHistory;
    if (isToken) {
      headers["access-token"] = localStorage.getItem("token");
    }

    axios({
      method,
      url: apiUrl,
      data,
      headers,
    })
      .then(function (response) {
        if (response.data.statusCode === 401) {
          return localStorage.removeItem("token");
        }

        return resolve({
          data: response.data,
          statusCode: response.status,
          message: response.statusText,
        });
      })
      .catch((error) => { return reject(error) });
  });

export default axiosApi;
