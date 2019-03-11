import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { clearUser } from "../../ducks/reducers/auth_reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SignOutButton extends Component {
  // constructor(props) {
  //   super(props);
  // }

  logout = async () => {
    await axios.post("/auth/logout");
    this.props.clearUser();
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <button onClick={this.logout}>
          <FontAwesomeIcon icon="sign-out-alt" size="3x" />
        </button>
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
