import React, { Component } from "react";
import { connect } from "react-redux";
import SignOutButton from "./../Buttons/SignOutButton";

class HomeHeader extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const {
      username,
      first_name,
      last_name,
      profile_pic
    } = this.props.currentUser;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div className="header-profile-pic-container">
          <img
            className="header-profile-pic"
            padding="0"
            width="90%"
            height="90%"
            src={profile_pic}
          />
        </div>
        <h3>Basicgram</h3>
        <SignOutButton />
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    currentUser: reduxState.auth_reducer
  };
};

export default connect(mapStateToProps)(HomeHeader);
