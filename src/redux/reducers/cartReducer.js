import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants";

const initialState = {
  cartData: {},
};
export default function (state = initialState, action) {
  console.log("taj - ", action.data);
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, cartData: action.data };
    case REMOVE_FROM_CART:
      console.log("reducer -- ", action.itemList);
      return [...state, action.itemList];

    default:
      return state;
  }
}
