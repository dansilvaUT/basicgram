import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { clearUser } from "../../../ducks/reducers/auth_reducer";

class Step3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      facebook_url: "",
      twitter_url: ""
    };
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
      alert("Email taken, choose a unique email");
    }
  };

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  render() {
    return (
      <div>
        <input />
        <input />
        <button>Go Back Button</button>
        <button>Skip</button>
        <button>Complete</button>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    email: reduxState.auth_reducer.email,
    password: reduxState.auth_reducer.password,
    username: reduxState.auth_reducer.username,
    first_name: reduxState.auth_reducer.first_name,
    last_name: reduxState.auth_reducer.last_name,
    privacy_level: reduxState.auth_reducer.privacy_level,
    profile_pic: reduxState.auth_reducer.profile_pic,
    user_age: reduxState.auth_reducer.user_age
  };
};

const mapDispatchToProps = {
  //Pass in function that updates relevant values
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Step3);
