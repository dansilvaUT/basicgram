import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  //   faComment
  faSave
} from "@fortawesome/free-regular-svg-icons";

class SaveCommentButton extends Component {
  render() {
    return (
      <button>
        <FontAwesomeIcon icon={faSave} size="1x" color="black" />
      </button>
    );
  }
}

export default SaveCommentButton;
