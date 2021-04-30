import axios from "axios";
import { useHistory } from "react-router-dom";

const axiosApi = (method, urlEndpoint, data, isToken = false) =>
  new Promise((resolve, reject) => {
    let headers = {};
    const history = useHistory();
    if (isToken) {
      headers = {
        "access-token": JSON.parse(localStorage.getItem("token")),
      };
    }
    axios({
      method,
      url: process.env.REACT_APP_URL + urlEndpoint,
      data,
      headers,
    })
      .then((response) => {
        return resolve({
          data: response.data,
          statusCode: response.status,
          message: response.statusText,
        });
      })
      .catch((error) => reject(error));
  });

export default axiosApi;
