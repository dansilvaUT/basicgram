import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { clearUser } from "../../ducks/reducers/auth_reducer";
import { updatePosts } from "../../ducks/reducers/post_reducer";
import { connect } from "react-redux";
import HomeHeader from "../Home/HomeHeader";

class Upload extends Component {
  constructor(props) {
    super();

    this.state = {
      editing: false,
      img_url: "",
      caption: ""
    };
  }

  componentDidMount() {
    this.checkUser();
  }

  checkUser = async () => {
    const { id } = this.props;
    if (!id) {
      try {
        let res = await axios.get("/api/currentuser");
        this.props.updateUser(res.data);
      } catch (err) {
        this.props.history.push("/");
      }
    }
  };

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  handleSubmitPost = () => {
    console.log("hit submit post");
    const { img_url, caption } = this.state;
    axios.post("/api/post", { img_url, caption }).then(resp => {
      this.setState({
        img_url: "",
        caption: ""
      });
    });
  };

  render() {
    const { img_url, caption } = this.state;
    const { id } = this.props;
    if (!id) return <Redirect to="/" />;
    return (
      <div>
        <div className="headers">
          <HomeHeader />
        </div>
        <div className="content">
          <div className="login-content-outer-container">
            <div className="login-content-inner-container">
              <h3
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  marginBottom: "10%",
                  color: "white"
                }}
              >
                Upload a photo
              </h3>
              <input
                className="input-box"
                placeholder="your post image url"
                value={img_url}
                onChange={e => this.handleChange("img_url", e.target.value)}
              />
              <input
                className="input-box"
                style={{ marginTop: "5%" }}
                placeholder="your post caption"
                value={caption}
                onChange={e => this.handleChange("caption", e.target.value)}
              />
              <button onClick={this.handleSubmitPost}>Submit Post</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  // console.log(reduxState);
  return {
    id: reduxState.auth_reducer.id,
    posts: reduxState.post_reducer.posts
  };
};

const mapDispatchToProps = {
  updatePosts,
  clearUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload);
