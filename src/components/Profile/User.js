import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import TwitterButton from "../Buttons/TwitterButton";
import FacebookButton from "../Buttons/FacebookButton";
import RedditButton from "../Buttons/RedditButton";
import TumblrButton from "../Buttons/TumblrButton";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };
  }

  render() {
    const {
      profile_pic,
      username,
      first_name,
      last_name,
      id,
      posts
    } = this.props;
    const postCount = posts.filter(post => {
      if (post.user_id == id) {
        return post;
      }
    }).length;

    return (
      <div>
        <div className="user-component-container">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="user-profile-pic-container">
              <img
                className="user-profile-pic"
                width="94%"
                height="94%"
                src={profile_pic}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <div style={{ fontWeight: "bold", fontSize: "1.5em" }}>
                {first_name}
              </div>
              <div style={{ fontWeight: "bold", fontSize: "1.5em" }}>
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
              {this.state.editing ? (
                <div>
                  <input />
                </div>
              ) : (
                <div style={{ fontWeight: "bold" }}>{username}</div>
              )}
              {this.state.editing ? (
                <div>
                  <input />
                </div>
              ) : (
                <div style={{ fontWeight: "bold" }}>item3</div>
              )}
            </div>
            <div className="social-media-container">
              <div>
                <TwitterButton />
              </div>
              <div>
                <RedditButton />
              </div>
              <div>
                <TumblrButton />
              </div>
              <div>
                <FacebookButton />
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
    profile_pic: reduxState.auth_reducer.profile_pic,
    first_name: reduxState.auth_reducer.first_name,
    last_name: reduxState.auth_reducer.last_name,
    username: reduxState.auth_reducer.username,
    posts: reduxState.post_reducer.posts
  };
};

export default connect(mapStateToProps)(User);
