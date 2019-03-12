import React, { Component } from "react";
import routes from "./routes";
import Nav from "./components/Nav/Nav";
import "./App.css";
import { withRouter } from "react-router-dom";
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
    console.log(this.props);
    return (
      <div className="App">
        {routes}
        {this.props.location.pathname === "/signup/step1" ||
        this.props.location.pathname === "/signup/step2" ||
        this.props.location.pathname === "/signup/step3" ||
        this.props.location.pathname === "/signup/step4" ||
        this.props.location.pathname === "/" ? (
          <div />
        ) : (
          <Nav />
        )}
      </div>
    );
  }
}

export default withRouter(App);

{
  /* <PersistGate persistor={persistor} loading={null}> */
}
{
  /* </PersistGate> */
}
