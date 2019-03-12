import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CommentButton extends Component {
  render() {
    return (
      <button>
        <FontAwesomeIcon icon="comment" size="2x" color="lightgrey" />
      </button>
    );
  }
}

export default CommentButton;
