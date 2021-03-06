import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Comment from "./Comment";
import BackButton from "../../Buttons/BackButton";
import Spinner from "react-spinkit";
import { updateComments } from "../../../ducks/reducers/comment_reducer";

class CommentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: "",
      opacity: "faded"
    };
  }

  componentDidMount() {
    this.getComments();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.post_id !== this.props.post_id) {
      this.getComments();
    }
  }

  getComments = async () => {
    const { post_id } = this.props;
    this.setState({
      comment: "",
      opacity: "faded"
    });
    try {
      let res = await axios.post(`/api/comments/${post_id}`);
      this.props.updateComments(res.data);
    } catch (err) {
      console.log("unable to retrieve posts");
    }
  };

  handleChange = async e => {
    await this.setState({
      comment: e.target.value
    });

    if (this.state.comment !== "") {
      this.setState({
        opacity: "solid"
      });
    } else {
      this.setState({
        opacity: "faded"
      });
    }
  };

  handleSubmitComment = () => {
    const { comment } = this.state;
    const { post_id } = this.props;

    axios.post("/api/comment", { post_id, comment }).then(resp => {
      this.getComments();
      this.setState({
        comment: ""
      });
    });
  };

  render() {
    const mappedComments = this.props.comments.map(comment => {
      return <Comment key={comment.comment_id} comment={comment} />;
    });
    return (
      <div className="comment-view-wrapper">
        <div
          className="comment-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center"
          }}
        >
          <div
            style={{ marginLeft: "2.5%" }}
            onClick={this.props.handleToggleCommentDisplay}
          >
            <BackButton />
          </div>
          <h2>Comments</h2>
          <div style={{ marginRight: "2.5%", width: "30px" }} />
        </div>
        {mappedComments.length ? (
          <div
            style={{
              height: "80vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            {mappedComments}
          </div>
        ) : (
          <div
            style={{
              height: "80vh",
              background: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center"
            }}
          >
            <div
              style={{
                width: "90%",
                display: "flex",
                justifyContent: "center"
              }}
            >
              There are no comments to display.
            </div>
            <div
              style={{
                width: "90%",
                display: "flex",
                justifyContent: "center"
              }}
            >
              Be the first to post!
            </div>
          </div>
        )}
        <div className="comment-footer">
          <div className="comment-input-section">
            <input value={this.state.comment} onChange={this.handleChange} />
            <button
              className={this.state.opacity}
              onClick={this.handleSubmitComment}
              style={{ fontWeight: "bold", color: "blue", fontSize: 12 }}
            >
              POST
            </button>
          </div>
        </div>
      </div>
    );
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
