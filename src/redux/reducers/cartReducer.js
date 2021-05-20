import {
  ADD_TO_CART,
  EDIT_CART_DETAILS,
  GET_FROM_CART,
  REMOVE_FROM_CART,
} from "../constants";

export default function (state = [], action) {
  switch (action.type) {
    case GET_FROM_CART:
      return [...state, ...action.data];

    case ADD_TO_CART:
      return [...state, action.data];

    case EDIT_CART_DETAILS:
      return [...state];

    case REMOVE_FROM_CART:
      return [
        ...action.itemList.filter((obj, ind) => obj[ind].id != action.deleteId),
      ];

    default:
      return state;
  }
}
