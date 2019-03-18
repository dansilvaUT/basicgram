import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

class EditCaptionButton extends Component {
  render() {
    return (
      <button>
        <FontAwesomeIcon icon={faEdit} size="2x" color="black" />
      </button>
    );
  }
}

export default EditCaptionButton;
