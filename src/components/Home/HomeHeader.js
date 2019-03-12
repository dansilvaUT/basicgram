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
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        <img
          alt="profile pic"
          src={profile_pic}
          width="15%"
          className="profile_pic"
        />
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
