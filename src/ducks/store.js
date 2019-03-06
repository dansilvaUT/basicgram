import { createStore, combineReducers } from "redux";
import auth_reducer from "./auth_reducer";
import header_reducer from "./header_reducer";

export default createStore(combineReducers(auth_reducer, header_reducer));
