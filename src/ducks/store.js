import { createStore, combineReducers } from "redux";
import auth_reducer from "./auth_reducer";
// import header_reducer from "./header_reducer";

export default createStore(
  auth_reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// export default createStore(combineReducers(auth_reducer, header_reducer));
