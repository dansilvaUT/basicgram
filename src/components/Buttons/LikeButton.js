import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart
  // faTrash
} from "@fortawesome/free-regular-svg-icons";

class LikeButton extends Component {
  constructor() {
    super();

    this.state = {
      clicked: false,
      color: "black"
    };
  }

  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          {this.state.clicked === false ? (
            <FontAwesomeIcon icon={faHeart} size="2x" color="black" />
          ) : (
            <FontAwesomeIcon icon="heart" size="2x" color="#fb3958" />
          )}
        </button>
      </div>
    );
  }
}

export default LikeButton;
