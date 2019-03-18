import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import {
  updateUserInfo4,
  clearUser
} from "./../../../ducks/reducers/register_reducer";

class Step4 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      facebook_url: "",
      twitter_url: ""
    };
  }

  componentDidMount() {
    this.setState({
      facebook_url: this.props.facebook_url,
      twitter_url: this.props.twitter_url
    });
  }

  register = async () => {
    let user = {
      email: this.props.email,
      password: this.props.password,
      username: this.props.username,
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      privacy_level: this.props.privacy_level,
      profile_pic: this.props.profile_pic,
      facebook_url: this.state.facebook_url,
      twitter_url: this.state.twitter_url,
      user_age: this.props.user_age
    };

    try {
      await axios.post("/auth/register", user);
      this.props.history.push("/home");
    } catch (err) {
      alert(
        "There was a problem creating your account. Please try again later."
      );
    }
  };

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  render() {
    const { facebook_url, twitter_url } = this.state;
    console.log(this.props);
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
            Connect to social media
          </h3>
          <div className="signup-content-inner-container">
            <div>
              <input
                className="input-box"
                placeholder="your facebook url"
                value={facebook_url}
                onChange={e =>
                  this.handleChange("facebook_url", e.target.value)
                }
              />
            </div>
            <div>
              <input
                style={{ marginTop: "5%" }}
                className="input-box"
                placeholder="your twitter url"
                value={twitter_url}
                onChange={e => this.handleChange("twitter_url", e.target.value)}
              />
            </div>
            <div
              className="signup-button-container"
              style={{
                marginTop: "10%",
                width: "100%",
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <button
                onClick={_ => {
                  this.props.updateUserInfo4(this.state);
                  this.props.history.push("/signup/step3");
                }}
              >
                Go Back
              </button>
              <button onClick={this.register}>Complete</button>
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
    password: reduxState.register_reducer.password,
    username: reduxState.register_reducer.username,
    first_name: reduxState.register_reducer.first_name,
    last_name: reduxState.register_reducer.last_name,
    privacy_level: reduxState.register_reducer.privacy_level,
    profile_pic: reduxState.register_reducer.profile_pic,
    user_age: reduxState.register_reducer.user_age,
    twitter_url: reduxState.register_reducer.twitter_url,
    facebook_url: reduxState.register_reducer.facebook_url
  };
};

const mapDispatchToProps = {
  updateUserInfo4,
  clearUser //Pass in function that updates relevant values
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Step4);
