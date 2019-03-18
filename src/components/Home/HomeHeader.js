import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SignOutButton from "./../Buttons/SignOutButton";
import insta_icon from "../../../src/insta_icon.png";

class HomeHeader extends Component {
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
          style={{ marginTop: "6px", marginLeft: "5%" }}
          alt="instagram icon"
          src={insta_icon}
          width="15%"
          onClick={() => this.props.history.push("/home")}
        />
        <h3>Basicgram</h3>
        <div style={{ marginTop: "6px", marginRight: "5%" }}>
          <SignOutButton />
        </div>
      </div>
    );
  }
}

export default withRouter(HomeHeader);
