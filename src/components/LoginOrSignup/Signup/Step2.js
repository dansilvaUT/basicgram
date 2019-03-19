import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import {
  updateUserInfo2,
  clearUser
} from "./../../../ducks/reducers/register_reducer";

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

  componentDidMount() {
    this.setState({
      username: this.props.username,
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      age: this.props.user_age
    });
  }

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  render() {
    console.log(this.props);
    const { username, first_name, last_name, age } = this.state;
    return (
      <div className="content">
        <div className="signup-content-outer-container">
          <h3
            style={{
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "10%",
              color: "white"
            }}
          >
            Enter your info
          </h3>
          <div className="signup-content-inner-container">
            <div>
              <input
                className="input-box"
                placeholder="instagram username"
                value={username}
                onChange={e => this.handleChange("username", e.target.value)}
              />{" "}
            </div>
            <div>
              <input
                className="input-box"
                style={{ marginTop: "5%" }}
                placeholder="your first name"
                value={first_name}
                onChange={e => this.handleChange("first_name", e.target.value)}
              />{" "}
            </div>
            <div>
              <input
                className="input-box"
                style={{ marginTop: "5%" }}
                placeholder="your last name"
                value={last_name}
                onChange={e => this.handleChange("last_name", e.target.value)}
              />{" "}
            </div>
            <div>
              <input
                className="input-box"
                style={{ marginTop: "5%" }}
                placeholder="your age"
                value={age}
                onChange={e => this.handleChange("age", e.target.value)}
              />{" "}
            </div>
            <div style={{ marginTop: "10%" }}>
              <button
                onClick={_ => {
                  this.props.updateUserInfo2(this.state);
                  this.props.history.push("/signup/step3");
                }}
              >
                Next Step
              </button>
            </div>
          </div>
          <button
            style={{ color: "white" }}
            className="cancel-button"
            onClick={() => {
              this.props.clearUser();
              this.props.history.push("/");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    username: reduxState.register_reducer.username,
    first_name: reduxState.register_reducer.first_name,
    last_name: reduxState.register_reducer.last_name,
    user_age: reduxState.register_reducer.user_age
  };
};

const mapDispatchToProps = {
  updateUserInfo2,
  clearUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Step2);
