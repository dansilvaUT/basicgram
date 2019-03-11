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
        className="headers"
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
          height="75%"
          className="profile_pic"
          border="2"
        />
        <p>
          {username}, {first_name}, {last_name}
        </p>
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
