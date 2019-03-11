import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import SignOutButton from "./../Buttons/SignOutButton";
import { Redirect } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.checkUser();
  }

  checkUser = async () => {
    const { id } = this.props;
    if (!id) {
      try {
        let res = await axios.get("/api/currentuser");
        this.props.updateUser(res.data);
      } catch (err) {
        this.props.history.push("/");
      }
    }
  };

  render() {
    const { id } = this.props;
    if (!id) return <Redirect to="/" />;
    return (
      <div>
        <SignOutButton />
        Profile
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  // console.log(reduxState);
  return {
    id: reduxState.auth_reducer.id
  };
};

export default connect(mapStateToProps)(Profile);
