import { GET_USERS, DELETE_USER, EDIT_USER, ADD_USER } from "../constants";

export default function (state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return [...action.data];
    case DELETE_USER:
      return [action.data];
    // case EDIT_USER:
    //   return [...state];
    // case ADD_USER:
    //   return [...state, action.data];
    default:
      return state;
  }
}
