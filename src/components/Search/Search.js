import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Search extends Component {
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
        <div className="headers">Search</div>
        <div className="content">Search</div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  // console.log(reduxState);
  return {
    id: reduxState.auth_reducer.id,
    posts: reduxState.post_reducer.posts
  };
};

export default connect(mapStateToProps)(Search);
