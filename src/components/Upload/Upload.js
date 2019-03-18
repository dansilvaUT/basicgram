import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { clearUser } from "../../ducks/reducers/auth_reducer";
import { updatePosts } from "../../ducks/reducers/post_reducer";
import { connect } from "react-redux";
import HomeHeader from "../Home/HomeHeader";

class Upload extends Component {
  constructor(props) {
    super();

    this.state = {
      editing: false,
      img_url: "",
      comment: ""
    };
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

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  handleSubmitPost = () => {
    console.log("hit submit post");
    const { img_url } = this.state;
    axios.post("/api/post", { img_url }).then(resp => {
      this.setState({
        img_url: ""
      });
    });
  };

  render() {
    const { img_url } = this.state;
    const { id } = this.props;
    if (!id) return <Redirect to="/" />;
    return (
      <div>
        <div className="headers">
          <HomeHeader />
        </div>
        <div className="content">
          <input
            className="input1"
            value={img_url}
            onChange={e => this.handleChange("img_url", e.target.value)}
          />
          <button onClick={this.handleSubmitPost}>Submit Post</button>
        </div>
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

const mapDispatchToProps = {
  updatePosts,
  clearUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload);
