import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { clearUser } from "../../ducks/reducers/auth_reducer";
import { updatePosts } from "../../ducks/reducers/post_reducer";
import HomeHeader from "./HomeHeader";
// import Spinner from "react-spinkit";
import PostList from "../Posts/PostList";

class Home extends Component {
  // constructor(props) {
  //   super(props);

  // this.state = {
  //   loading: false
  // };
  // }

  componentDidMount() {
    // this.setState({ loading: true });
    this.getUser();
    this.getPosts();
  }

  getUser = async () => {
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

  getPosts = async () => {
    try {
      let res = await axios.get("/api/posts");
      this.props.updatePosts(res.data);
      // this.setState({ loading: false });
    } catch (err) {
      console.log("unable to retrieve posts");
    }
  };

  render() {
    const { id } = this.props;
    if (!id) return <Redirect to="/" />;
    // console.log(this.props.posts);
    // if (this.props.posts.length) {
    //   console.log(this.props.posts[0].img_url);
    // }
    return (
      <div>
        {/* {this.state.loading ? (
          <Spinner name="ball-scale-ripple-multiple" color="fuchsia" />
        ) : ( */}
        <div>
          <div>
            <HomeHeader />
          </div>
          <div className="content">
            <PostList />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
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
)(Home);
