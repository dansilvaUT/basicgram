import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { clearUser } from "../../ducks/auth_reducer";
import HomeHeader from "./HomeHeader";

class Home extends Component {
  constructor(props) {
    super(props);
  }

=

  render() {
    return (
      <div>
        <HomeHeader />
        Home
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
  clearUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
