import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/LoginOrSignup/Login";
import Signup from "./components/LoginOrSignup/Signup";
import Home from "./components/Home/Home";
import Search from "./components/Search/Search";
import Upload from "./components/Upload/Upload";
import Chat from "./components/Chat/Chat";
import Profile from "./components/Profile/Profile";

export default (
  <Switch>
    <Route path="/home" component={Home} />
    <Route path="/search" component={Search} />
    <Route path="/upload" component={Upload} />
    <Route path="/chat" component={Chat} />
    <Route path="/profile" component={Profile} />
    <Route path="/signup" component={Signup} />
    <Route exact path="/" component={Login} />
  </Switch>
);
