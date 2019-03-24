import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

class User extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { profile_pic, username, first_name, last_name } = this.props;
    return (
      <div>
        <div className="user-component-container">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="user-profile-pic-container">
              <img className="user-profile-pic" width="95%" src={profile_pic} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <div style={{ fontWeight: "bold" }}>{first_name}</div>
              <div style={{ fontWeight: "bold" }}>{last_name}</div>
            </div>
          </div>
          <div className="user-info">
            <div>item1</div>
            <div>item2</div>
            <div>item3</div>
            <div>item4</div>
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
