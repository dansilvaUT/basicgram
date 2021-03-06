import React, { Component } from "react";
import axios from "axios";
import LoginOrSignupHeader from "./LoginOrSignupHeader";
import { connect } from "react-redux";
import { updateUser } from "../../ducks/reducers/auth_reducer";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      id: 0,
      email: "",
      password: ""
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
        this.props.history.push("/home");
      } catch (err) {}
    } else {
      this.props.history.push("/home");
    }
  };

  login = async () => {
    let user = {
      email: this.state.email,
      password: this.state.password
    };

    try {
      let res = await axios.post("/auth/login", user);
      this.props.updateUser(res.data);
      this.props.history.push("/home");
    } catch (err) {
      alert("Incorrect email or password");
    }
  };

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <div className="headers">
          <LoginOrSignupHeader />
        </div>
        <div className="content">
          <div className="login-content-outer-container">
            <div className="login-content-inner-container">
              <div>
                <h3
                  style={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    marginBottom: "10%",
                    color: "white"
                  }}
                >
                  Login
                </h3>
                <input
                  className="input-box"
                  placeholder="email"
                  value={email}
                  onChange={e => this.handleChange("email", e.target.value)}
                />{" "}
              </div>
              <div>
                <input
                  className="input-box"
                  style={{ marginTop: "5%" }}
                  placeholder="password"
                  type="password"
                  value={password}
                  onChange={e => this.handleChange("password", e.target.value)}
                />{" "}
              </div>

              <button onClick={this.login}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    id: reduxState.id
  };
};

const mapDispatchToProps = {
  updateUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
