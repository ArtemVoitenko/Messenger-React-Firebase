import React, { Component } from "react";
import firebase from "../../firebase";
import LoadingIndicator from "../LoadingIndicator";
import { Link } from "react-router-dom";
export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
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
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
          console.log(createdUser);
          this.setState({
            loading: false
          });
        })
        .catch(catchedError => {
          console.log(catchedError);
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
      error = { message: "Check the passwords." };
      this.setState(({ errors }) => {
        return { errors: errors.concat(error) };
      });
      return false;
    } else {
      return true;
    }
  };
  isFormEmpty = ({ password, passwordConfirmation, username, email }) => {
    return (
      !password.length ||
      !passwordConfirmation.length ||
      !username.length ||
      !email.length
    );
  };
  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
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
          <div className="form__title">Register</div>
        </div>
        <div className="form__content">
          <input
            onChange={this.onInputChange}
            type="text"
            name="username"
            value={username}
            className="form__input"
          />
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
          <input
            onChange={this.onInputChange}
            type="password"
            name="passwordConfirmation"
            value={passwordConfirmation}
            className="form__input"
          />
          <button type="submit" className="form__submit">
            Submit
          </button>
          {errors.length ? this.showErrors(errors) : null}
          <Link to="/login" className="form__link">
            Already has an account?
          </Link>
        </div>
        {loading ? <LoadingIndicator /> : null}
      </form>
    );
  }
}
