import axiosApi from "../../../axiosLib";
import {
  ADD_TO_CART,
  EDIT_CART_DETAILS,
  GET_FROM_CART,
  REMOVE_FROM_CART,
} from "../../constants";

export const getCartDataAction = (params) => async (dispatch, getState) => {
  const state = getState();
  let data;
  let response = await fetchApiFunction("get");
  if (response.statusCode === 200) {
    data = response.data;
    dispatch({
      type: GET_FROM_CART,
      data,
    });
  }
};

export const editCartDataAction = (params) => async (dispatch, getState) => {
  const state = getState();
  console.log(`params`, params);
  let response = await fetchApiFunction(
    "PATCH",
    JSON.stringify({
      count: params.count,
      price: params.price,
    }),
    params.id
  );
  // response = await fetchApiFunction("get");
  let data;
  if (response.statusCode === 200) {
    // data = response.data;
    // dispatch(getCartDataAction());
    console.log(`response data`, response.data);
  }
};

export const addToCartAction = (param) => async (dispatch, getState) => {
  const state = getState();
  let data;
  const response = await fetchApiFunction("post", param);
  data = response.data;
  if (response.statusCode == 201) {
    dispatch({
      type: ADD_TO_CART,
      data,
    });
  } else {
    alert(response.message);
  }
};

export const removeFromCartAction =
  (deleteId) => async (dispatch, getState) => {
    const state = getState();
    let itemList = [...state.cartData];

    // if (state.cartData.length == 0) {
    //   const fromApi = await fetchApiFunction("get");
    //   if (fromApi.statusCode == 200) {
    //     itemList = fromApi.data;
    //     state.cartData = fromApi.data;
    //   }
    // }

    console.log("state -- is -- ", state, " item List -- ", itemList);

    const removeData = await fetchApiFunction("delete", [], deleteId);
    if (removeData.statusCode === 200) {
      dispatch({
        type: REMOVE_FROM_CART,
        itemList,
        deleteId,
      });
    }
  };

const fetchApiFunction = async (method, param = [], id = "") => {
  let data = await axiosApi(
    method,
    process.env.REACT_APP_LOCAL_API_URL + "Cart/" + id,
    param,
    false
  );
  return data;
};
