import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Search from "./components/Search";
import Upload from "./components/Upload";
import Chat from "./components/Chat";
import Profile from "./components/Profile";

export default (
  <Switch>
    <Route path="/home" component={Home} />
    <Route path="/search" component={Search} />
    <Route path="/upload" component={Upload} />
    <Route path="/chat" component={Chat} />
    <Route path="/profile" component={Profile} />
    <Route exact path="/" component={Login} />
  </Switch>
);
