import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

class EditCommentButton extends Component {
  render() {
    return (
      <button>
        <FontAwesomeIcon icon={faPen} size="1x" color="black" />
      </button>
    );
  }
}

export default EditCommentButton;
