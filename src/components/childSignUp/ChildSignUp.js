import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Axios from "axios";

import "./ChildSignUp.css";
import Header from "../header/Header";
import { BASE_URL } from "../api";

class ChildSignUp extends React.Component {
  state = {
    firstName: "",
    secondName: "",
    userName: "",
    password: "",
    DoB: new Date(),
    grade: "",
    formHighSchool: "",

    formErrors: {
      firstName: "First Name field required",
      secondName: "Last Name field required",
      userName: "User Name field required",
      password: "Password is required",
      grade: "Grade is required",
      formHighSchool: "Class is required",
    },
  };

  onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const { formErrors } = this.state;
    let nameRegex = RegExp(/[!@#$%^&*(),.?":{}|<>/+=]/g);

    switch (name) {
      case "firstName":
        formErrors.firstName = nameRegex.test(value)
          ? "Special Characters not allowed"
          : "";
        break;

      case "secondName":
        formErrors.secondName = nameRegex.test(value)
          ? "Special Characters not allowed"
          : "";
        break;

      case "password":
        formErrors.password =
          value.length < 6 && value.length > 0
            ? "minimum 6 characters required"
            : "";
        break;

      case "userName":
        formErrors.userName =
          value.length < 4 && value.length > 0
            ? "minimum 4 characters required"
            : "";
        break;

      case "grade":
        formErrors.grade = value ? "" : "Required";
        formErrors.formHighSchool = formErrors.grade;
        break;

      case "formHighSchool":
        formErrors.formHighSchool = value ? "" : "Required";
        formErrors.grade = formErrors.formHighSchool;
        break;

      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  onDoBChange = (DoB) => {
    this.setState({ DoB });
  };

  formValid = (formErrors) => {
    let valid = true;

    Object.values(formErrors).forEach((val) => {
      val.length > 0 && (valid = false);
    });

    return valid;
  };

  onSubmitHandler = async (e) => {
    e.preventDefault();
    const {
      firstName,
      secondName,
      userName,
      password,
      DoB,
      grade,
      formHighSchool,
      formErrors,
    } = this.state;

    if (this.formValid(formErrors)) {
      let data = {
        firstName,
        lastName: secondName,
        username: userName,
        password,
        dateOfBirth: DoB,
        parentId: localStorage.getItem("parentId"),
        grade,
        formHighSchool,
        role: 1,
        status: 1,
      };

      try {
        const response = await Axios.post(
          BASE_URL + "user/unsecured/save",
          data
        );

        alert(response.data.message);
        if (response.data.message === "Username exist") {
          alert("use a different email to create an account");
          return;
        }
      } catch (e) {
        alert("error saving child, contact admin");
        return;
      }

      // this.props.history.push("/login");
    } else {
      const {
        firstName,
        secondName,
        userName,
        password,
        grade,
        formHighSchool,
      } = formErrors;

      alert(
        firstName ||
          secondName ||
          userName ||
          password ||
          grade ||
          formHighSchool
      );
    }
  };

  render() {
    const { firstName, secondName, password, DoB, userName } = this.state;

    return (
      <div className="child-sign__up">
        <div className="dark-overlay">
          <Header />
          <div className="container child-sign">
            <div className="child-signup__header my-3">Sign up your child</div>
            <div className="row">
              <div className="col-md-6">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Expedita commodi tempora dolorem distinctio! Excepturi, natus
                debitis? Provident aliquam facere cumque id corrupti, commodi
                quae natus alias. Veniam expedita dolorum recusandae?
              </div>
              <div className="col-md-6">
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
                        value={secondName}
                        name="secondName"
                        type="text"
                        className="form-control"
                        id="second-name"
                        placeholder="Enter second name"
                      />
                      <small>
                        <span className="errorMessage">
                          {this.state.formErrors.secondName}
                        </span>
                      </small>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="user-name">User Name</label>
                        <input
                          onChange={this.onChangeHandler}
                          value={userName}
                          name="userName"
                          type="text"
                          className="form-control"
                          id="user-name"
                          placeholder="User Name"
                        />
                        <small>
                          <span className="errorMessage">
                            {this.state.formErrors.userName}
                          </span>
                        </small>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          onChange={this.onChangeHandler}
                          value={password}
                          name="password"
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Password"
                        />
                        <small>
                          <span className="errorMessage">
                            {this.state.formErrors.password}
                          </span>
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="DOB-date mt-2">
                    <label
                      className="DoB-date__label mr-2"
                      htmlFor="DoB-date__picker"
                    >
                      Pick Date of Birth:
                    </label>
                    <DatePicker
                      selected={DoB}
                      id="DoB-date__picker"
                      onChange={this.onDoBChange}
                    />
                  </div>

                  <div className="row my-2">
                    <div className="col-md-6">
                      <label
                        className="primary-select"
                        htmlFor="primary-school"
                      >
                        Primary School
                      </label>
                      <select
                        className="custom-select mr-sm-2"
                        id="primary-school"
                        onChange={this.onChangeHandler}
                        name="grade"
                      >
                        <option defaultValue>Choose Grade</option>
                        <option value="1">Grade One</option>
                        <option value="2">Grade Two</option>
                        <option value="3">Grade Three</option>
                        <option value="4">Grade Four</option>
                        <option value="5">Grade Five</option>
                        <option value="6">Grade Six</option>
                        <option value="7">Grade Seven</option>
                        <option value="8">Grade Eight</option>
                      </select>
                      <small>
                        <span className="errorMessage">
                          {this.state.formErrors.grade}
                        </span>
                      </small>
                    </div>

                    <div className="col-md-6">
                      <label className="primary-select" htmlFor="high-school">
                        High School
                      </label>
                      <select
                        className="custom-select mr-sm-2"
                        id="high-school"
                        onChange={this.onChangeHandler}
                        name="grade"
                      >
                        <option defaultValue>Choose Level</option>
                        <option value="9">Form One</option>
                        <option value="10">Form Two</option>
                        <option value="11">Form Three</option>
                        <option value="12">Form Four</option>
                      </select>
                      <small>
                        <span className="errorMessage">
                          {this.state.formErrors.formHighSchool}
                        </span>
                      </small>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="create-account__btn btn btn-primary"
                    onClick={this.onSubmitHandler}
                  >
                    Add
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChildSignUp;
