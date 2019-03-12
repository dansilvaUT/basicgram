import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import NavButton from "./../Buttons/NavButton";

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="nav-bar"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <Link to="/home">
          {this.props.location.pathname.includes("/home") ? (
            <NavButton name="home" color="black" />
          ) : (
            <NavButton name="home" color="#686868" />
          )}
        </Link>
        <Link to="/search">
          {this.props.location.pathname.includes("/search") ? (
            <NavButton name="search" color="black" />
          ) : (
            <NavButton name="search" color="#686868" />
          )}
        </Link>
        <Link to="/upload">
          {this.props.location.pathname === "/upload" ? (
            <NavButton name="file-upload" color="black" />
          ) : (
            <NavButton name="file-upload" color="#686868" />
          )}
        </Link>
        <Link to="/chat">
          {this.props.location.pathname.includes("/chat") ? (
            <NavButton name="comments" color="black" />
          ) : (
            <NavButton name="comments" color="#686868" />
          )}
        </Link>
        <Link to="/profile">
          {this.props.location.pathname.includes("/profile") ? (
            <NavButton name="user" color="black" />
          ) : (
            <NavButton name="user" color="#686868" />
          )}
        </Link>
      </div>
    );
  }
}

export default withRouter(Nav);
