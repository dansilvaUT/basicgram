import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

class Chat extends Component {
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
    return <div>Chat</div>;
  }
}

const mapStateToProps = reduxState => {
  // console.log(reduxState);
  return {
    id: reduxState.auth_reducer.id
  };
};

export default connect(mapStateToProps)(Chat);
