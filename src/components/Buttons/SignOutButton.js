import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { clearUser } from "./../../ducks/auth_reducer";

class SignOutButton extends Component {
  constructor(props) {
    super(props);
  }

  logout = async () => {
    await axios.post("/auth/logout");
    this.props.clearUser();
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <button onClick={this.logout}>Sign Out</button>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    reduxState
  };
};

const mapDispatchToProps = {
  clearUser
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignOutButton)
);
