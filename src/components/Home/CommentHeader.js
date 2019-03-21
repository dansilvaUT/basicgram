import React, { Component } from "react";
import SignOutButton from "./../Buttons/SignOutButton";
import insta_icon from "../../../src/insta_icon.png";

class CommentHeader extends Component {
  render() {
    return (
      <div
        style={{
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
        <h2>Basicgram</h2>
        <div style={{ marginTop: "0px", marginRight: "5%" }}>
          <SignOutButton />
        </div>
      </div>
    );
  }
}

export default CommentHeader;
