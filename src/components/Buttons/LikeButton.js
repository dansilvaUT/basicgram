import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faThumbsDown
  // faTrash
} from "@fortawesome/free-regular-svg-icons";

class LikeButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      likedByUser,
      handleAddLike,
      handleDeleteLike,
      username
    } = this.props;
    return (
      <div>
        {username == "todd" && likedByUser ? (
          <button onClick={() => handleDeleteLike()}>
            <FontAwesomeIcon icon={faThumbsDown} size="2x" color="black" />
          </button>
        ) : likedByUser ? (
          <button onClick={() => handleDeleteLike()}>
            <FontAwesomeIcon icon="heart" size="2x" color="#fb3958" />
          </button>
        ) : (
          <button onClick={() => handleAddLike()}>
            <FontAwesomeIcon icon={faHeart} size="2x" color="black" />
          </button>
        )}
      </div>
    );
  }
}

export default LikeButton;
