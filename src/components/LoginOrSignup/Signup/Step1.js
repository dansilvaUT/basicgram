import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import {
  updateUserInfo1,
  clearUser
} from "./../../../ducks/reducers/register_reducer";

class Step1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      passwordTwo: "",
      passwordsMatch: null,
      emailTaken: true,
      emailChecked: false
    };
  }

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  handleCheckPassword = () => {
    const { password, passwordTwo } = this.state;
    if (passwordTwo !== password) {
      this.setState({
        passwordsMatch: false
      });
    } else {
      this.setState({
        passwordsMatch: true
      });
    }
  };

  handleCheckEmail = () => {
    const { email } = this.state;
    axios
      .post("/api/checkemail", { email })
      .then(resp => {
        this.setState({
          emailTaken: false,
          emailChecked: true
        });
      })
      .catch(err => {
        this.setState({
          emailTaken: true
        });
      });
  };

  render() {
    const { email, password, passwordTwo } = this.state;
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
            Create a Profile
          </h3>
          <div className="signup-content-inner-container">
            <div>
              <input
                className="input-box"
                placeholder="email"
                value={email}
                onChange={e => this.handleChange("email", e.target.value)}
                // onBlur={this.handleCheckEmail}
              />
            </div>
            <div>
              <input
                style={{ marginTop: "5%" }}
                className="input-box"
                placeholder="password"
                type="password"
                value={password}
                onChange={e => this.handleChange("password", e.target.value)}
              />
            </div>
            <div>
              <input
                style={{ marginTop: "5%" }}
                className="input-box"
                placeholder="confirm password"
                type="password"
                value={passwordTwo}
                onChange={e => this.handleChange("passwordTwo", e.target.value)}
                onBlur={this.handleCheckPassword}
              />
            </div>
            <div
              className="signup-button-container"
              style={{ marginTop: "10%" }}
            >
              <button
                onClick={() => {
                  this.handleCheckEmail();
                  if (this.state.passwordsMatch == false) {
                    alert(
                      "Passwords do not match. Please enter a valid password"
                    );
                  } else if (
                    this.state.email !== "" &&
                    this.state.emailTaken == false &&
                    this.state.emailChecked
                  ) {
                    this.props.updateUserInfo1(this.state);
                    this.props.history.push("/signup/step2");
                  } else {
                    alert(
                      "Email invalid or taken. Please enter a different email"
                    );
                  }
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
    email: reduxState.register_reducer.email,
    password: reduxState.register_reducer.password
  };
};

const mapDispatchToProps = {
  updateUserInfo1,
  clearUser //Pass in function that updates relevant values
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Step1);
