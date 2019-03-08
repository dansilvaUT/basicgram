import React, { Component } from "react";
// import axios from "axios";
// import { connect } from "react-redux";
import SignOutButton from "./../Buttons/SignOutButton";

class Profile extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
        <SignOutButton />
        Profile
      </div>
    );
  }
}

export default Profile;
