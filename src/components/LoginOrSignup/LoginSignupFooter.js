import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

class LoginSignupFooter extends Component {
  render() {
    return (
      <div>
        {this.props.location.pathname === "/signup/step1" ||
        this.props.location.pathname === "/signup/step2" ||
        this.props.location.pathname === "/signup/step3" ||
        this.props.location.pathname === "/signup/step4" ? (
          <Link to="/">
            <div className="login-signup-footer">
              <p>Don't have an account? Click here to Login. </p>
            </div>
          </Link>
        ) : (
          <Link to="/signup/step1">
            <div className="login-signup-footer">
              <p>Don't have an account? Click here to Signup. </p>
            </div>
          </Link>
        )}
      </div>
    );
  }
}

export default withRouter(LoginSignupFooter);
