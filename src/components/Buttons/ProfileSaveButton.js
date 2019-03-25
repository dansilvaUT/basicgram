import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  //   faComment
  faSave
} from "@fortawesome/free-solid-svg-icons";

class ProfileSaveButton extends Component {
  render() {
    return (
      <button>
        <FontAwesomeIcon icon={faSave} size="lg" color="black" />
      </button>
    );
  }
}

export default ProfileSaveButton;
