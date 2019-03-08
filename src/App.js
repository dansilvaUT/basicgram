import React, { Component } from "react";
import routes from "./routes";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./ducks/store";
import Nav from "./components/Nav/Nav";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div className="App">
            {routes}
            <Nav />
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
