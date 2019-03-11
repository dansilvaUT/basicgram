import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// faHeart,
// faComment,
// faUser,
// faComments,
// faSearch,
// faTrash,
// faUserEdit,
// faPen,
// faHome,
// faFileUpload

class NavButton extends Component {
  render() {
    return (
      <button>
        <FontAwesomeIcon icon={this.props.name} size="3x" color="black" />
      </button>
    );
  }
}

export default NavButton;
