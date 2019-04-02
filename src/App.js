import React, { Component } from "react";
import routes from "./routes";
import Nav from "./components/Nav/Nav";
import LoginSignupFooter from "./components/LoginOrSignup/LoginSignupFooter";
import "./App.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
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
      <div class="App-container">
        <div className="App">
          {routes}
          {this.props.location.pathname.includes("/signup") ||
          this.props.location.pathname === "/" ? (
            <LoginSignupFooter />
          ) : (
            <div>
              <Nav />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    showComments: reduxState.comment_reducer.showComments
  };
};

export default withRouter(connect(mapStateToProps)(App));

{
  /* <PersistGate persistor={persistor} loading={null}> */
}
{
  /* </PersistGate> */
}
