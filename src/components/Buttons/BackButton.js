import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft
  // faTrash
} from "@fortawesome/free-solid-svg-icons";

class BackButton extends Component {
  render() {
    return (
      <button>
        <FontAwesomeIcon icon={faChevronLeft} size="2x" color="black" />
      </button>
    );
  }
}

export default BackButton;
