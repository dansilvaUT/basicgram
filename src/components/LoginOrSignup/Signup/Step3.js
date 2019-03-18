import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import {
  updateUserInfo3,
  clearUser
} from "./../../../ducks/reducers/register_reducer";

class Step3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile_pic: ""
    };
  }

  componentDidMount() {
    this.setState({
      profile_pic: this.props.profile_pic
    });
  }

  checkProfilePic = async () => {
    if (this.state.profile_pic === "") {
      await this.setState({
        profile_pic: `https://robohash.org/${this.state.email}`
      });
    }
  };

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  render() {
    const { profile_pic } = this.state;
    return (
      <div className="content">
        <div className="signup-content-outer-container">
          <h3
            style={{
              fontWeight: "bold",
              textTransform: "uppercase",
              color: "white"
            }}
          >
            Choose a profile pic
          </h3>
          <div className="signup-content-inner-container">
            <div>
              <input
                className="input-box"
                placeholder="profile_pic url"
                value={profile_pic}
                onChange={e => this.handleChange("profile_pic", e.target.value)}
              />{" "}
            </div>
            <div>
              <button
                onClick={_ => {
                  this.checkProfilePic();
                  this.props.updateUserInfo3(this.state);
                  this.props.history.push("/signup/step2");
                }}
              >
                Go Back
              </button>{" "}
              <button
                onClick={_ => {
                  this.checkProfilePic();
                  this.props.updateUserInfo3(this.state);
                  this.props.history.push("/signup/step4");
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
    profile_pic: reduxState.register_reducer.profile_pic
  };
};

const mapDispatchToProps = {
  updateUserInfo3,
  clearUser //Pass in function that updates relevant values
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Step3);
