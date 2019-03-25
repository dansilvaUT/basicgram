import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";

class FacebookButton extends Component {
  render() {
    return (
      <button>
        <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
      </button>
    );
  }
}

export default FacebookButton;
