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

  changeColor = () => {
    this.setState({
      clicked: !clicked
    });

    if ((this.state.clicked = false)) {
      this.setState({
        color: "black"
      });
    } else {
      this.setState({
        color: "#fb3958"
      });
    }
  };

  render() {
    return (
      <button onClick={this.changeColor}>
        <FontAwesomeIcon icon={faHeart} size="2x" color={this.state.color} />
      </button>
    );
  }
}

export default LikeButton;
