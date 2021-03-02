import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./ParentSignUp.css";
import Header from "../header/Header";
import { BASE_URL } from "../api";

class ParentSignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: "",
    disabled: false,
    formErrors: {
      firstName: "First Name field required",
      lastName: "Last Name field required",
      email: "Email field required",
      password: "Password is required",
      confirmPassword: "Confirm password is required",
      terms: "To register, please accept usage general canditions",
    },
  };

  formValid = (formErrors) => {
    let valid = true;

    Object.values(formErrors).forEach((val) => {
      val.length > 0 && (valid = false);
    });

    return valid;
  };

  onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let { formErrors, password } = this.state;
    let nameRegex = RegExp(/[!@#$%^&*(),.?":{}|<>/+=]/g);
    let emailRegex = RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gim
    );

    switch (name) {
      case "firstName":
        formErrors.firstName = nameRegex.test(value)
          ? "Special Characters not allowed"
          : "";
        break;

      case "lastName":
        formErrors.lastName = nameRegex.test(value)
          ? "Special Characters not allowed"
          : "";
        break;

      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Enter a valid email address";
        break;

      case "password":
        formErrors.password =
          value.length < 6 && value.length > 0
            ? "minimum 6 characters required"
            : "";
        break;

      case "confirmPassword":
        formErrors.confirmPassword =
          value !== password ? "passwords don't match" : "";
        break;

      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  onSubmitHandler = async (e) => {
    e.preventDefault();
    this.setState({ disabled: true });
    const { firstName, lastName, email, password, formErrors } = this.state;

    if (this.formValid(formErrors)) {
      let data = {
        email,
        firstName,
        lastName,
        password,
        role: 2,
        username: email,
        status: 1,
      };

      try {
        const response = await axios.post(
          BASE_URL + "user/unsecured/save",
          data
        );

        if (response) {
          this.setState({ disabled: false });
        }
        // alert(response.data.message);
        if (response.data.message === "Username exist") {
          alert("Username exist, use a different email to create an account");
          return;
        }
        alert(response.data.message);
      } catch (e) {
        alert("error saving teacher, contact admin");
        return;
      }

      // this.props.history.push("/login");
    } else {
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        terms,
      } = formErrors;

      alert(
        firstName || lastName || email || password || confirmPassword || terms
      );
    }
  };

  onCheckBoxChangeHandler = (e) => {
    let { formErrors } = this.state;

    formErrors.terms = e.target.checked
      ? ""
      : "To register, please accept usage general canditions";

    this.setState({ formErrors });
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      disabled,
    } = this.state;

    return (
      <div className="sign-up__parent">
        <div className="dark-overlay">
          <Header />
          <div className="container">
            <div className="row signup-parent__content">
              <div className="col-md-6 parent-gain">
                <div className="start-motivation">Let's start, it's easy</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Assumenda similique commodi ullam voluptate, amet dolore. Earum,
                iure omnis. Rerum tempore, recusandae quibusdam unde tenetur cum
                porro sint itaque at error.
              </div>
              <div className="col-md-6 sign-up__form">
                <form>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="first-name">First Name</label>
                      <input
                        onChange={this.onChangeHandler}
                        value={firstName}
                        name="firstName"
                        type="text"
                        className="form-control"
                        id="first-name"
                        placeholder="Enter first name"
                      />
                      <small>
                        <span className="errorMessage">
                          {this.state.formErrors.firstName}
                        </span>
                      </small>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="second-name">Second Name</label>
                      <input
                        onChange={this.onChangeHandler}
                        value={lastName}
                        name="lastName"
                        type="text"
                        className="form-control"
                        id="second-name"
                        placeholder="Enter second name"
                      />
                      <small>
                        <span className="errorMessage">
                          {this.state.formErrors.lastName}
                        </span>
                      </small>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                      onChange={this.onChangeHandler}
                      value={email}
                      name="email"
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                    />
                    <small>
                      <span className="errorMessage">
                        {this.state.formErrors.email}
                      </span>
                    </small>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="exampleInputPassword1">Password</label>
                      <input
                        onChange={this.onChangeHandler}
                        value={password}
                        name="password"
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                      />
                      <small>
                        <span className="errorMessage">
                          {this.state.formErrors.password}
                        </span>
                      </small>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="exampleInputPassword2">
                        Confirm Password
                      </label>
                      <input
                        onChange={this.onChangeHandler}
                        value={confirmPassword}
                        name="confirmPassword"
                        type="password"
                        className="form-control"
                        id="exampleInputPassword2"
                        placeholder="Password"
                      />
                      <small>
                        <span className="errorMessage">
                          {this.state.formErrors.confirmPassword}
                        </span>
                      </small>
                    </div>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="terms"
                      onChange={this.onCheckBoxChangeHandler}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      I accept the{" "}
                      <b className="terms-service">Terms of Service</b>
                    </label>
                    <small className="terms-error__message">
                      <span className="errorMessage">
                        {this.state.formErrors.terms}
                      </span>
                    </small>
                  </div>
                  <div className="form-check alert">
                    <input type="checkbox" className="form-check-input" />
                    <label className="form-check-label" htmlFor="terms">
                      Would you like to receive alerts ?{" "}
                    </label>
                  </div>
                  <button
                    onClick={this.onSubmitHandler}
                    type="submit"
                    className="create-account__btn btn btn-primary"
                    disabled={disabled}
                  >
                    Create Account
                  </button>
                  <div className="to-login">
                    Already have an account?{" "}
                    <Link to="/login">
                      <b className="terms-service">Log in!</b>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ParentSignUp;
