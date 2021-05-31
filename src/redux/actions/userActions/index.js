import axiosApi from "../../../axiosLib";
import {
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
  GET_USERS,
  GET_SINGLE_USER,
} from "../../constants";

// export const addUserDetails = (params) => async (dispatch, getState) => {
//   const state = getState();
//   let response = axiosApi(
//     "get",
//     process.env.REACT_APP_LOCAL_API_URL + "register"
//   );

//   if (response.statusCode === 200) {
//     dispatch({
//       type: ADD_USER,
//       data: response.data,
//     });
//   }
// };

export const getUserDetails = (page, limit) => async (dispatch, getState) => {
  const state = getState();
  const response = await axiosApi(
    "get",
    process.env.REACT_APP_LOCAL_API_URL +
      "register" +
      "?id_ne=1&_page=" +
      page +
      "&_limit=" +
      limit +
      "&_sort=role&_order=desc"
  );

  if (response.statusCode === 200) {
    dispatch({
      type: GET_USERS,
      data: response.data,
    });
  }
};

export const editUserDetails = (params) => async (dispatch, getState) => {
  const state = getState();
  let response = axiosApi(
    "put",
    process.env.REACT_APP_LOCAL_API_URL + "register/" + params.id,
    params,
    false
  );

  if (response.statusCode === 200) {
    dispatch({
      type: GET_USERS,
      data: state,
    });
  }
};

export const deleteUserDetails = (id) => async (dispatch, getState) => {
  const state = getState();
  const userDetails = [...state.userDetails];
  let response = await axiosApi(
    "delete",
    process.env.REACT_APP_LOCAL_API_URL + "register/" + id
  );

  if (response.statusCode === 200) {
    const data = userDetails.filter((obj) => obj.id !== id);
    dispatch({
      type: DELETE_USER,
      data,
    });
  }
};

export const getSingleUser = (id) => async (dispatch, getState) => {
  const state = getState();
  const response = await axiosApi(
    "get",
    process.env.REACT_APP_LOCAL_API_URL + "register/" + id
  );
  if (response.statusCode === 200) {
    const data = response.data;
    dispatch({
      type: GET_SINGLE_USER,
      data,
    });
  }
};
