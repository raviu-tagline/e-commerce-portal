import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants";

export default function (state = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      console.log(state, action);
      return [...state, action.data];
    case REMOVE_FROM_CART:
      return [
        ...action.itemList.filter((obj, ind) => obj[ind].id != action.deleteId),
      ];

    default:
      return state;
  }
}
