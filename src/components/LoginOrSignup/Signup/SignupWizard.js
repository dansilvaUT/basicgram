import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { clearUser } from "./../../../ducks/reducers/auth_reducer";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import axios from "axios";
import LoginOrSignupHeader from "./../LoginOrSignupHeader";

class SignupWizard extends Component {
  componentDidMount() {
    this.checkUser();
  }

  checkUser = async () => {
    const { id } = this.props;
    if (!id) {
      try {
        let res = await axios.get("/api/currentuser");
        this.props.updateUser(res.data);
        this.props.history.push("/home");
      } catch (err) {}
    } else {
      this.props.history.push("/home");
    }
  };

  render() {
    return (
      <div>
        <div className="headers">
          <LoginOrSignupHeader />
        </div>
        <div className="content">
          <h2>Create a Profile</h2>
          <button
            onClick={_ => {
              this.props.clearUser();
              this.props.history.push("/");
            }}
          >
            Cancel
          </button>
          <Route path="/signup/step1" component={Step1} />
          <Route path="/signup/step2" component={Step2} />
          <Route path="/signup/step3" component={Step3} />
          <Route path="/signup/step4" component={Step4} />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { clearUser }
)(SignupWizard);
