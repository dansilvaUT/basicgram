import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  //   faComment
  faTrashAlt
} from "@fortawesome/free-regular-svg-icons";

class DeletePostButton extends Component {
  render() {
    return (
      <button>
        <FontAwesomeIcon icon={faTrashAlt} size="2x" color="black" />
      </button>
    );
  }
}

export default DeletePostButton;
