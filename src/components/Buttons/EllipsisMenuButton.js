import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH
  // faTrash
} from "@fortawesome/free-solid-svg-icons";

class EllipsisMenuButton extends Component {
  render() {
    return (
      <button>
        <FontAwesomeIcon icon={faEllipsisH} size="1x" color="black" />
      </button>
    );
  }
}

export default EllipsisMenuButton;
