import { ADD_TO_CART, REMOVE_FROM_CART } from "../../constants";

export const addToCartAction = (data) => (dispatch, getState) => {
  const state = getState();
  dispatch({
    type: ADD_TO_CART,
    data,
  });
};

export const removeFromCartAction = (deleteId) => (dispatch, getState) => {
  console.log("Delete id -- ", deleteId);
  const state = getState();
  const itemList = [...state.cartData];
  const index = findIndex(itemList, deleteId);
  console.log(index);
  if (index > -1) {
    itemList.splice(index, 1);
  }

  console.log("After -- ", itemList);
  dispatch({
    type: REMOVE_FROM_CART,
    itemList,
  });
};

const findIndex = (list, findingId) =>
  list.findIndex((x) => x.cartData.id === findingId);
