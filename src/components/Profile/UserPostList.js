import React, { Component } from "react";
import { connect } from "react-redux";
import User from "./User";
import UserPost from "./UserPost";
import Spinner from "react-spinkit";

class UserList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id } = this.props;
    if (this.props.posts.length) {
      const mappedUserPosts = this.props.posts
        .filter(post => {
          if (post.user_id == id) {
            return post;
          }
        })
        .map(post => {
          return (
            <UserPost
              key={post.post_id}
              img_url={post.img_url}
              id={this.props.id}
            />
          );
        });
      return <div className="user-post-list">{mappedUserPosts}</div>;
    }
  }
}

const mapStateToProps = reduxState => {
  return {
    id: reduxState.auth_reducer.id,
    posts: reduxState.post_reducer.posts
  };
};

export default connect(mapStateToProps)(UserList);
