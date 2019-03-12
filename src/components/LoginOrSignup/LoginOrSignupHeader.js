import React, { Component } from "react";
import insta_icon from "../../../src/insta_icon.png";

class LoginOrSignupHeader extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center"
        }}
      >
        <img
          alt="profile pic"
          src={insta_icon}
          width="15%"
          className="insta_icon"
        />
        <h3>Basicgram</h3>
      </div>
    );
  }
}

export default LoginOrSignupHeader;
