import React, { Component } from "react";
import firebase from "../../firebase";
import LoadingIndicator from "../LoadingIndicator";
import { Link } from "react-router-dom";
import md5 from "md5";
export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      loading: false,
      errors: [],
      usersRef: firebase.database().ref("users")
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
          createdUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`
            })
            .then(() => {
              this.saveUser(createdUser).then(() => {
                console.log(createdUser);
                this.setState({
                  loading: false
                });
              });
            })
            .catch(err => {
              this.setState({
                errors: this.state.errors.concat(err),
                loading: false
              });
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
  saveUser = createdUser => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    });
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
      return (
        <div className="error" key={i}>
          {error.message}
        </div>
      );
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
      <div className="centrator">
        <form onSubmit={this.onFormSubmit} className="form">
          <div className="form__header">
            <div className="form__title">Register</div>
          </div>
          <div className="form__content">
            <label class="form__input">
              <span class="form__label">Username</span>
              <input
                onChange={this.onInputChange}
                type="text"
                name="username"
                value={username}
                className="form__field"
              />
            </label>
            <label class="form__input">
              <span class="form__label">E-mail</span>
              <input
                onChange={this.onInputChange}
                type="email"
                name="email"
                value={email}
                className="form__field"
              />
            </label>
            <label class="form__input">
              <span class="form__label">Password</span>
              <input
                onChange={this.onInputChange}
                type="password"
                name="password"
                value={password}
                className="form__field"
              />
            </label>
            <label class="form__input">
              <span class="form__label">Confirm password</span>
              <input
                onChange={this.onInputChange}
                type="password"
                name="passwordConfirmation"
                value={passwordConfirmation}
                className="form__field"
              />
            </label>
            <button type="submit" className="button form__submit">
              Submit
            </button>

            <Link to="/login" className="form__link">
              Already has an account?
            </Link>
            {errors.length ? this.showErrors(errors) : null}
          </div>
          {loading ? <LoadingIndicator /> : null}
        </form>
      </div>
    );
  }
}
