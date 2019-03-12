import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser } from "./../../ducks//reducers/auth_reducer";
import { Link } from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      username: "",
      first_name: "",
      last_name: "",
      privacy_level: 0,
      profile_pic: "",
      facebook_url: "",
      twitter_url: "",
      user_age: 0
    };
  }

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

  checkProfilePic = async () => {
    if (this.state.profile_pic === "") {
      await this.setState({
        profile_pic: `https://robohash.org/${this.state.email}`
      });
    }
  };

  register = async () => {
    await this.checkProfilePic();

    let user = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      privacy_level: this.state.privacy_level,
      profile_pic: this.state.profile_pic,
      facebook_url: this.state.facebook_url,
      twitter_url: this.state.twitter_url,
      user_age: this.state.user_age
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
    const {
      email,
      username,
      password,
      first_name,
      last_name,
      privacy_level,
      profile_pic,
      facebook_url,
      twitter_url,
      user_age
    } = this.state;
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Link to="/">
            <button>Go to Login</button>
          </Link>
          <input
            placeholder="email"
            value={email}
            onChange={e => this.handleChange("email", e.target.value)}
          />
          <input
            placeholder="password"
            value={password}
            onChange={e => this.handleChange("password", e.target.value)}
          />
          <input
            placeholder="username"
            value={username}
            onChange={e => this.handleChange("username", e.target.value)}
          />
          <input
            placeholder="first_name"
            value={first_name}
            onChange={e => this.handleChange("first_name", e.target.value)}
          />
          <input
            placeholder="last_name"
            value={last_name}
            onChange={e => this.handleChange("last_name", e.target.value)}
          />
          <input
            type="number"
            placeholder="privacy_level"
            value={privacy_level}
            onChange={e => this.handleChange("privacy_level", e.target.value)}
          />
          <input
            placeholder="profile_pic"
            value={profile_pic}
            onChange={e => this.handleChange("profile_pic", e.target.value)}
          />
          <input
            placeholder="facebook_url"
            value={facebook_url}
            onChange={e => this.handleChange("facebook_url", e.target.value)}
          />
          <input
            placeholder="twitter_url"
            value={twitter_url}
            onChange={e => this.handleChange("twitter_url", e.target.value)}
          />
          <input
            type="number"
            placeholder="user_age"
            value={user_age}
            onChange={e => this.handleChange("user_age", e.target.value)}
          />
          <button onClick={this.register}>Register</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    id: reduxState.auth_reducer.id
  };
};

const mapDispatchToProps = {
  updateUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
