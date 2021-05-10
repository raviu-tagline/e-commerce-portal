import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants";

export default function (state = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, { cartData: action.data }];

    case REMOVE_FROM_CART:
      console.log(action, " In reducer");
      return [...state, { cartData: action.itemList }];

    default:
      return state;
  }
}
