import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser } from "../../ducks/reducers/auth_reducer";
import TwitterButton from "../Buttons/TwitterButton";
import FacebookButton from "../Buttons/FacebookButton";
import RedditButton from "../Buttons/RedditButton";
import TumblrButton from "../Buttons/TumblrButton";
import EditProfileButton from "../Buttons/EditProfileButton";
import ProfileSaveButton from "../Buttons/ProfileSaveButton";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameEditing: false,
      emailEditing: false,
      username: this.props.username,
      email: this.props.email
    };
  }

  componentDidMount() {}

  handleChange = (prop, val) => {
    this.setState({
      [prop]: val
    });
  };

  handleUsernameEdit = () => {
    this.setState({
      usernameEditing: true
    });
  };

  handleUsernameSave = async () => {
    const { username } = this.state;
    await axios.put("/api/updateusername", { username }).then(resp => {
      this.setState({
        username: resp.data[0].username,
        usernameEditing: false
      });
    });
    // this.props.updateUser(username);
  };

  handleEmailEdit = () => {
    this.setState({
      emailEditing: true
    });
  };

  handleEmailSave = async () => {
    const { email } = this.state;
    await axios.put("/api/updateemail", { email }).then(resp => {
      this.setState({
        email: resp.data[0].email,
        emailEditing: false
      });
    });
    // this.props.updateUser(email);
  };

  render() {
    const {
      profile_pic,
      username,
      first_name,
      last_name,
      id,
      posts,
      email
    } = this.props;
    const postCount = posts.filter(post => {
      if (post.user_id == id) {
        return post;
      }
    }).length;

    return (
      <div>
        <div className="user-component-container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "40%",
              height: "100%",
              justifyContent: "space-around"
            }}
          >
            <div className="user-profile-pic-container">
              <img
                className="user-profile-pic"
                width="94%"
                height="94%"
                src={profile_pic}
              />
            </div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "1.3em"
                }}
              >
                {first_name}
              </div>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "1.3em",
                  marginLeft: "3px"
                }}
              >
                {last_name}
              </div>
            </div>
          </div>
          <div className="user-info-container">
            <div className="user-info">
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                    alignItems: "center"
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>{postCount}</div>
                  <div style={{ fontSize: "0.8em", fontWeight: "bold" }}>
                    posts
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                    alignItems: "center"
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>18</div>
                  <div style={{ fontSize: "0.8em", fontWeight: "bold" }}>
                    followers
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                    alignItems: "center"
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>14</div>
                  <div style={{ fontSize: "0.8em", fontWeight: "bold" }}>
                    following
                  </div>
                </div>
              </div>
              {this.state.usernameEditing ? (
                <div style={{ display: "flex" }}>
                  <input
                    className="profile-input"
                    value={this.state.username}
                    onChange={e =>
                      this.handleChange("username", e.target.value)
                    }
                  />
                  <div onClick={this.handleUsernameSave}>
                    <ProfileSaveButton />
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex" }}>
                  <div style={{ fontWeight: "bold", fontSize: "1.1em" }}>
                    {this.state.username}
                  </div>
                  <div onClick={this.handleUsernameEdit}>
                    <EditProfileButton />
                  </div>
                </div>
              )}
              {this.state.emailEditing ? (
                <div style={{ display: "flex" }}>
                  <input
                    className="profile-input"
                    value={this.state.email}
                    onChange={e => this.handleChange("email", e.target.value)}
                  />
                  <div onClick={this.handleEmailSave}>
                    <ProfileSaveButton />
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.1em"
                    }}
                  >
                    {this.state.email}
                  </div>
                  <div onClick={this.handleEmailEdit}>
                    <EditProfileButton />
                  </div>
                </div>
              )}
            </div>
            <div className="social-media-container">
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <TwitterButton />
                  <EditProfileButton />
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <RedditButton />
                  <EditProfileButton />
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <TumblrButton />
                  <EditProfileButton />
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <FacebookButton />
                  <EditProfileButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    id: reduxState.auth_reducer.id,
    email: reduxState.auth_reducer.email,
    profile_pic: reduxState.auth_reducer.profile_pic,
    first_name: reduxState.auth_reducer.first_name,
    last_name: reduxState.auth_reducer.last_name,
    username: reduxState.auth_reducer.username,
    posts: reduxState.post_reducer.posts
  };
};

export default connect(
  mapStateToProps,
  { updateUser }
)(User);
