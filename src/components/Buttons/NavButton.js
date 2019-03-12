import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";

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
        <FontAwesomeIcon
          icon={this.props.name}
          size="3x"
          color={this.props.color}
        />
      </button>
    );
  }
}

export default withRouter(NavButton);
