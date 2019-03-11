import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "./Post";

class PostList extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const mappedPosts = this.props.posts.map(post => {
      return <Post key={post.post_id} post={post} height="50vh" />;
    });
    return (
      <div>
        <div>{mappedPosts}</div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    posts: reduxState.post_reducer.posts
  };
};

export default connect(mapStateToProps)(PostList);
