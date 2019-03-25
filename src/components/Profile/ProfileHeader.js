import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SignOutButton from "./../Buttons/SignOutButton";
import insta_icon from "../../../src/insta_icon.png";

class ProfileHeader extends Component {
  render() {
    const { username } = this.props;
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "space-between"
        }}
      >
        <img
          style={{ marginTop: "0px", marginLeft: "5%" }}
          alt="instagram icon"
          src={insta_icon}
          width="15%"
          onClick={() => this.props.history.push("/home")}
        />
        <div style={{ fontWeight: "bold", fontSize: "1.5em" }}>{username}</div>
        <div style={{ marginTop: "0px", marginRight: "5%" }}>
          <SignOutButton />
        </div>
      </div>
    );
  }
}

export default withRouter(ProfileHeader);
