import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { clearUser } from "../../ducks/reducers/auth_reducer";
import { updatePosts } from "../../ducks/reducers/post_reducer";
import { connect } from "react-redux";
import HomeHeader from "../Home/HomeHeader";
import Dropzone from "react-dropzone";
import Spinner from "react-spinkit";
import { v4 as randomString } from "uuid";

class Upload extends Component {
  constructor(props) {
    super();

    this.state = {
      isUploading: false,
      // editing: false,
      img_url: "",
      caption: "",
      url: ""
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
    const { img_url, caption, url } = this.state;
    axios.post("/api/post", { url, caption }).then(resp => {
      this.setState({
        img_url: "",
        caption: "",
        url: ""
      });
      alert("Post successfully uploaded");
    });
  };

  getSignedRequest = ([file]) => {
    this.setState({ isUploading: true });
    // We are creating a file name that consists of a random string, and the name of the file that was just uploaded with the spaces removed and hyphens inserted instead. This is done using the .replace function with a specific regular expression. This will ensure that each file uploaded has a unique name which will prevent files from overwriting other files due to duplicate names.
    const fileName = `${randomString()}-${file.name.replace(/\s/g, "-")}`;

    // We will now send a request to our server to get a "signed url" from Amazon. We are essentially letting AWS know that we are going to upload a file soon. We are only sending the file-name and file-type as strings. We are not sending the file itself at this point.
    axios
      .get("/api/signs3", {
        params: {
          "file-name": fileName,
          "file-type": file.type
        }
      })
      .then(response => {
        const { signedRequest, url } = response.data;
        this.uploadFile(file, signedRequest, url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        "Content-Type": file.type
      }
    };

    axios
      .put(signedRequest, file, options)
      .then(response => {
        this.setState({ isUploading: false, url });
      })
      .catch(err => {
        this.setState({
          isUploading: false
        });
        if (err.response.status === 403) {
          alert(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
              err.stack
            }`
          );
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
  };

  render() {
    const { caption, isUploading, url } = this.state;
    const { id } = this.props;
    if (!id) return <Redirect to="/" />;
    return (
      <div>
        <div className="headers">
          <HomeHeader />
        </div>
        <div className="content">
          <div className="login-content-outer-container">
            <div
              className="login-content-inner-container"
              style={{ justifyContent: "space-between", margin: 0 }}
            >
              <h3
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  marginBottom: "0",
                  color: "white"
                }}
              >
                Upload a photo
              </h3>
              <p style={{ fontSize: 8 }}>{url}</p>
              <img src={url} alt="" width="150px" height="150px" style={{borderWidth: 1, borderStyle: "dashed", borderColor: "grey"}} />
              <div>
                <Dropzone
                  onDropAccepted={this.getSignedRequest}
                  style={{
                    position: "relative",
                    width: 100,
                    height: 100,
                    borderWidth: 5,
                    marginTop: 15,
                    borderColor: "rgb(102, 102, 102)",
                    borderStyle: "dashed",
                    borderRadius: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 12
                  }}
                  accept="image/*"
                  multiple={false}
                >
                  {isUploading ? (
                    <Spinner className="loader" name="ball-grid-pulse" />
                  ) : (
                    <p>Drop File or Click Here</p>
                  )}
                </Dropzone>{" "}
              </div>
              {/* <input
                className="input-box"
                placeholder="your post image url"
                value={img_url}
                onChange={e => this.handleChange("img_url", e.target.value)}
              /> */}
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
