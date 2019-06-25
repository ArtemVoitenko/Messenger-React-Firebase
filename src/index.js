import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import App from "./components/App";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import "./styles/styles.scss";
import firebase from "./firebase";
import { Provider, connect } from "react-redux";
import store from "./store";
import { setUser } from "./actions";
class Root extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user);
        this.props.history.push("/");
      }
    });
  }
  render() {
    return (
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    );
  }
}
const RootWithAuth = withRouter(
  connect(
    null,
    { setUser }
  )(Root)
);
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById("root")
);
