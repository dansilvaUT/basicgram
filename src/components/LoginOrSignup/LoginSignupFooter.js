import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

class LoginSignupFooter extends Component {
  render() {
    return (
      <div
        className="login-signup-footer"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {this.props.location.pathname.includes("/signup") ? (
          <Link to="/">
            <p style={{ margin: "0" }}>Already have an account? </p>
            <div
              className="login-signup-footer-1"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0"
              }}
            >
              <p style={{ margin: "3px" }}>Click here to Login. </p>
            </div>
          </Link>
        ) : (
          <Link to="/signup/step1">
            <p style={{ margin: "0" }}>Don't have an account? </p>
            <div
              className="login-signup-footer-2"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0"
              }}
            >
              <p style={{ margin: "3px" }}>Click here to Signup</p>
            </div>
          </Link>
        )}
      </div>
    );
  }
}

export default withRouter(LoginSignupFooter);
