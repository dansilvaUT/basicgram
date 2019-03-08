import React, { Component } from "react";
import { connect } from "react-redux";
import SignOutButton from "./../Buttons/SignOutButton";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      username,
      first_name,
      last_name,
      profile_pic
    } = this.props.reduxState;
    return (
      <div>
        <img src={profile_pic} width="25px" height="25px" />
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
    reduxState
  };
};

export default connect(mapStateToProps)(HomeHeader);
