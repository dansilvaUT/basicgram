import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavButton from "./../Buttons/NavButton";

class Nav extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
        <Link to="/home">
          <NavButton name="Home" />
        </Link>
        <Link to="/search">
          <NavButton name="Search" />
        </Link>
        <Link to="/upload">
          <NavButton name="Upload" />
        </Link>
        <Link to="/chat">
          <NavButton name="Chat" />
        </Link>
        <Link to="/profile">
          <NavButton name="Profile" />
        </Link>
      </div>
    );
  }
}

export default Nav;
