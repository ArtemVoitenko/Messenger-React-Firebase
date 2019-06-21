import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./components/App";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import "./styles/styles.scss";

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
