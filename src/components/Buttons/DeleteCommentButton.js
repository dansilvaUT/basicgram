import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  //   faComment
  faTrash
} from "@fortawesome/free-solid-svg-icons";

class DeleteCommentButton extends Component {
  render() {
    return (
      <button>
        <FontAwesomeIcon icon={faTrash} size="1x" color="black" />
      </button>
    );
  }
}

export default DeleteCommentButton;
