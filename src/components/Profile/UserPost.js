import React, { Component } from "react";

class UserPost extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { img_url } = this.props;

    return (
      <div style={{ height: "20vh", width: "33.3%" }}>
        <img src={img_url} width="100%" height="100%" />
      </div>
    );
  }
}

export default UserPost;
