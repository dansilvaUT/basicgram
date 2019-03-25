import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";

class TwitterButton extends Component {
  render() {
    return (
      <button>
        <FontAwesomeIcon icon={faTwitterSquare} size="2x" />
      </button>
    );
  }
}

export default TwitterButton;
