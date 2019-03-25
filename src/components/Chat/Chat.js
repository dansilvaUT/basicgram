import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import UserList from "./UserList";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      opacity: "faded",
      users: []
    };
  }

  componentDidMount() {
    this.checkUser();
    this.getUsers();
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

  getUsers = async () => {
    console.log("hit get users");
    await axios.get("/api/users").then(resp => {
      console.log(resp);
      this.setState({
        users: resp.data
      });
    });
  };

  handleChange = async e => {
    await this.setState({
      search: e.target.value
    });

    if (this.state.search !== "") {
      this.setState({
        opacity: "solid"
      });
    } else {
      this.setState({
        opacity: "faded"
      });
    }
  };

  render() {
    console.log(this.state.users);
    const { id } = this.props;
    if (!id) return <Redirect to="/" />;
    return (
      <div>
        <div
          className="headers"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div
            className="comment-input-section"
            style={{
              borderWidth: "1px",
              borderRadius: "16px",
              paddingRight: "5px",
              paddingLeft: "5px"
            }}
          >
            <input
              value={this.state.search}
              onChange={this.handleChange}
              placeholder="Search Users"
              style={{ textAlign: "center" }}
            />
            <button
              className={this.state.opacity}
              onClick={this.handleSearch}
              style={{ fontWeight: "bold", color: "blue", fontSize: 12 }}
            >
              SEARCHING
            </button>
          </div>
        </div>
        <div className="content">
          <UserList users={this.state.users} search={this.state.search} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  // console.log(reduxState);
  return {
    id: reduxState.auth_reducer.id
  };
};

export default connect(mapStateToProps)(Chat);
