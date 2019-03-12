import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class LikeButton extends Component {
  render() {
    return (
      <button>
        <FontAwesomeIcon icon="heart" size="2x" color="lightgrey" />
      </button>
    );
  }
}

export default LikeButton;
