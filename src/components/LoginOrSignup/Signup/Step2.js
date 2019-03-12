import React, { Component } from "react";
import { connect } from "react-redux";

import { clearUser } from "./../../../ducks/reducers/auth_reducer";

class Step2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      first_name: "",
      last_name: "",
      age: ""
    };
  }

  render() {
    return (
      <div>
        <input />
        <input />
        <input />
        <button>Go Back Button</button>
        <button
          onClick={_ => {
            // this.props.updateLocation(this.state);
            this.props.history.push("/signup/step3");
          }}
        >
          Next Step
        </button>
        <button>Skip</button>
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
)(Step2);
