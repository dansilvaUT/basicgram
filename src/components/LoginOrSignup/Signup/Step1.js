import React, { Component } from "react";
import { connect } from "react-redux";

import { clearUser } from "./../../../ducks/reducers/auth_reducer";

class Step1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  render() {
    return (
      <div>
        <input />
        <input />
        <button
          onClick={_ => {
            // this.props.updateLocation(this.state);
            this.props.history.push("/signup/step2");
          }}
        >
          Next Step
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
  //Pass in function that updates relevant values
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Step1);
