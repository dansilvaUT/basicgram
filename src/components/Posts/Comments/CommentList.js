import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Comment from "./Comment";
import Spinner from "react-spinkit";
import { updateComments } from "../../../ducks/reducers/comment_reducer";

class CommentList extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.getComments();
  }

  getComments = async () => {
    const { post_id } = this.props;
    try {
      let res = await axios.post(`/api/comments/${post_id}`);
      this.props.updateComments(res.data);
      // this.setState({ loading: false });
    } catch (err) {
      console.log("unable to retrieve posts");
    }
  }; ///make axios call to get comments specific to post_id

  render() {
    if (this.props.comments.length) {
      const mappedComments = this.props.comments.map(comment => {
        return (
          <Comment key={comment.comment_id} comment={comment} height="50vh" />
        );
      });
      return (
        <div>
          <div style={{ height: "10vh", width: "100%" }}>Header</div>
          <div>{mappedComments}</div>
          <div
            style={{
              position: "fixed",
              height: "10vh",
              bottom: "0",
              width: "100%"
            }}
          >
            Footer
          </div>
        </div>
      );
    } else {
      console.log("hit loader");
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            height: "80vh"
          }}
        >
          no comment
          {/* <Spinner className="loader" name="ball-grid-pulse" color="fuchsia" /> */}
        </div>
      );
    }
  }
}

const mapStateToProps = reduxState => {
  return {
    post_id: reduxState.comment_reducer.post_id,
    comments: reduxState.comment_reducer.comments
  };
};

const mapDispatchToProps = {
  updateComments
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentList);
