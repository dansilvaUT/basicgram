import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedditSquare } from "@fortawesome/free-brands-svg-icons";

class RedditButton extends Component {
  render() {
    return (
      <button>
        <FontAwesomeIcon icon={faRedditSquare} size="2x" />
      </button>
    );
  }
}

export default RedditButton;
