import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTumblrSquare } from "@fortawesome/free-brands-svg-icons";

class TumblrButton extends Component {
  render() {
    return (
      <button>
        <FontAwesomeIcon icon={faTumblrSquare} size="2x" />
      </button>
    );
  }
}

export default TumblrButton;
