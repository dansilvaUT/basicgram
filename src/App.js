import React, { Component } from "react";
import routes from "./routes";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Nav from "./components/Nav/Nav";
import "./App.css";
import store from "./ducks/store";
// import { store, persistor } from "./ducks/store";
// import { PersistGate } from "redux-persist/integration/react";

///FONT AWESOME IMPORTS AND LIBRARY INITIALIZATION
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faHeart,
  faComment,
  faUser,
  faComments,
  faSearch,
  faTrash,
  faUserEdit,
  faPen,
  faHome,
  faFileUpload,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

library.add(
  fab,
  faHeart,
  faComment,
  faUser,
  faComments,
  faSearch,
  faTrash,
  faUserEdit,
  faPen,
  faHome,
  faFileUpload,
  faSignOutAlt
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <PersistGate persistor={persistor} loading={null}> */}
        <HashRouter>
          <div className="App">
            {routes}
            <Nav />
          </div>
        </HashRouter>
        {/* </PersistGate> */}
      </Provider>
    );
  }
}

export default App;
