import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavButton from "./../Buttons/NavButton";

// faHeart,
// faComment,
// faUser,
// faComments,
// faSearch,
// faTrash,
// faUserEdit,
// faPen,
// faHome,
// faFileUpload

class Nav extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div
        className="nav-bar"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <Link to="/home">
          <NavButton name="home" />
        </Link>
        <Link to="/search">
          <NavButton name="search" />
        </Link>
        <Link to="/upload">
          <NavButton name="file-upload" />
        </Link>
        <Link to="/chat">
          <NavButton name="comments" />
        </Link>
        <Link to="/profile">
          <NavButton name="user" />
        </Link>
      </div>
    );
  }
}

export default Nav;
