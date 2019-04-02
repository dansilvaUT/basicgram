import React, { Component } from "react";
import { connect } from "react-redux";
import ChatUser from "./ChatUser";
import Spinner from "react-spinkit";

class UserList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.search) {
      if (this.props.users.length) {
        const mappedUsers = this.props.users
          .filter(user => {
            return user.username.toLowerCase().includes(this.props.search);
          })
          .map(user => {
            return (
              <ChatUser
                key={user.user_id}
                user={user}
                id={this.props.id}
                height="10vh"
              />
            );
          });
        return <div>{mappedUsers}</div>;
      } else
        return (
          <div
            className="post-list-container"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              height: "80vh"
            }}
          >
            <Spinner className="loader" name="ball-grid-pulse" />
          </div>
        );
    } else {
      if (this.props.users.length) {
        const mappedUsers = this.props.users
          .filter(user => {
            return user.username.toLowerCase().includes(this.props.search);
          })
          .map(user => {
            return (
              <ChatUser
                key={user.user_id}
                user={user}
                id={this.props.id}
                height="10vh"
              />
            );
          });
        return <div>{mappedUsers}</div>;
      } else
        return (
          <div
            className="post-list-container"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              height: "80vh"
            }}
          >
            <Spinner className="loader" name="ball-grid-pulse" />
          </div>
        );
    }
  }
}

const mapStateToProps = reduxState => {
  return {
    id: reduxState.auth_reducer.id
  };
};

export default connect(mapStateToProps)(UserList);
