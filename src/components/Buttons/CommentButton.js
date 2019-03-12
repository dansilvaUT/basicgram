import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment
  // faTrash
} from "@fortawesome/free-regular-svg-icons";

class CommentButton extends Component {
  render() {
    return (
      <button>
        <FontAwesomeIcon icon={faComment} size="2x" color="black" />
      </button>
    );
  }
}

export default CommentButton;
