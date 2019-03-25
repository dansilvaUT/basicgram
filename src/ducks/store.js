// import { applyMiddleware, createStore, compose } from "redux";
// import { combineReducers } from "redux";
// import auth_reducer from "./reducers/auth_reducer";
// import post_reducer from "./reducers/post_reducer";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "keysss",
//   storage
// };

// const middlewares = [];

// const reduxStore = combineReducers({ auth_reducer, post_reducer });

// const persistedReducer = persistReducer(persistConfig, reduxStore);

// export const store = createStore(
//   persistedReducer,
//   undefined,
//   compose(applyMiddleware(...middlewares))
// );

// export const persistor = persistStore(store);

import { createStore, combineReducers } from "redux";
import auth_reducer from "./reducers/auth_reducer";
import post_reducer from "./reducers/post_reducer";
import register_reducer from "./reducers/register_reducer";
import comment_reducer from "./reducers/comment_reducer";

const reduxStore = combineReducers({
  auth_reducer,
  post_reducer,
  register_reducer,
  comment_reducer
});

export default createStore(
  reduxStore,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
