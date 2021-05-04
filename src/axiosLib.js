import axios from "axios";
import { useHistory } from "react-router-dom";

// , data, isToken = false

const axiosApi = (method, endpoint, data, isToken) =>
  new Promise((resolve, reject) => {
    let headers = {};
    const history = useHistory;
    if (isToken) {
      headers = {
        "access-token": localStorage.getItem("token"),
        "Content-type": "application/json",
      };
    }

    axios({
      method,
      url: process.env.REACT_APP_LOCAL_API_URL + endpoint,
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
      .catch((error) => reject(error));
  });

export default axiosApi;