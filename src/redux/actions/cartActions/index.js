import axiosApi from "../../../axiosLib";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../../constants";

export const addToCartAction = (data) => (dispatch, getState) => {
  const state = getState();
  console.log("Count -- ", data);
  let resp = fetchApiFunction("post", data);
  if (resp.statusCode === 201) {
    dispatch({
      type: ADD_TO_CART,
      data,
    });
  }
};

export const removeFromCartAction = (deleteId) => (dispatch, getState) => {
  const state = getState();
  const itemList = [...state.cartData];
  const index = findIndex(itemList, deleteId);

  console.log(
    " itemList -- ",
    itemList,
    " State -- ",
    state
    // "ID -- ",
    // deleteId,
    // " index -- ",
    // index
  );
  if (index > -1) {
    itemList.splice(index, 1);
  }

  dispatch({
    type: REMOVE_FROM_CART,
    itemList,
  });
};

const findIndex = (list, findingId) =>
  list.findIndex((x) => x.id === findingId);

async function fetchApiFunction(method, param = "", id = "") {
  let response = await axiosApi(
    method,
    process.env.REACT_APP_LOCAL_API_URL + "Cart/" + id,
    param,
    false
  );

  return response;
}
