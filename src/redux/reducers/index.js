import { combineReducers } from "redux";
import cartData from "./cartReducer";
import userDetails from "./userReducer";

export default combineReducers({ cartData, userDetails });
