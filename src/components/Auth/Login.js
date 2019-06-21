import React, { Component } from "react";
import firebase from "../../firebase";
import LoadingIndicator from "../LoadingIndicator";
import { Link } from "react-router-dom";
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: []
    };
  }
  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onFormSubmit = e => {
    e.preventDefault();
    this.setState({
      errors: []
    });
    if (this.isFormValid()) {
      this.setState({
        loading: true
      });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(username => {
          console.log(username);
          this.setState({
            loading: false
          });
        })
        .catch(catchedError => {
          const error = { message: catchedError.message };
          this.setState(({ errors }) => {
            return {
              loading: false,
              errors: errors.concat(error)
            };
          });
        });
    }
  };

  isFormValid = () => {
    let errors = [];
    let error;
    if (this.isFormEmpty(this.state)) {
      error = { message: "Fill all inputs." };
      this.setState(({ errors }) => {
        return { errors: errors.concat(error) };
      });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Check the password" };
      this.setState(({ errors }) => {
        return { errors: errors.concat(error) };
      });
      return false;
    } else {
      return true;
    }
  };
  isFormEmpty = ({ password, email }) => {
    return !password.length || !email.length;
  };
  isPasswordValid = ({ password }) => {
    if (password.length < 6) {
      return false;
    } else {
      return true;
    }
  };
  showErrors = errors => {
    return errors.map((error, i) => {
      return <div key={i}>{error.message}</div>;
    });
  };
  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      loading,
      errors
    } = this.state;
    return (
      <form onSubmit={this.onFormSubmit} className="form">
        <div className="form__header">
          <div className="form__title">Login</div>
        </div>
        <div className="form__content">
          <input
            onChange={this.onInputChange}
            type="email"
            name="email"
            value={email}
            className="form__input"
          />
          <input
            onChange={this.onInputChange}
            type="password"
            name="password"
            value={password}
            className="form__input"
          />
          <button type="submit" className="form__submit">
            Login
          </button>
          {errors.length ? this.showErrors(errors) : null}
          <Link to="/register" className="form__link">
            Want to register?
          </Link>
        </div>
        {loading ? <LoadingIndicator /> : null}
      </form>
    );
  }
}
