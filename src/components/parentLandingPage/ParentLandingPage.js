import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import "./ParentLandingPage.css";
import { BASE_URL } from "../api";
import ParentViewStudentAssignment from "../parentViewStudentAssignment/ParentViewStudentAssignment";
import ParentViewStudentAssessment from "../parentViewStudentAssessment/ParentViewStudentAssessment";
import { fetchStudentLessons } from "../../actions";
import ChildTimeTable from "../childTimeTable/ChildTimeTable";
import ParentAddChildMessage from "../parentAddChildMessage/ParentAddChildMessage";

class ParentLandingPage extends React.Component {
  state = {
    kids: [],
    selected: "assignment-view",
    username: "",
    firstname: "",
    lastname: "",
    defaultKid: "",
  };

  componentWillMount() {
    this.fetchKids();
    this.props.fetchStudentLessons();
  }

  fetchKids = async () => {
    try {
      const response = await axios.get(
        BASE_URL +
          `student/secured/findByParent/${localStorage.getItem("parentId")}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      this.setState({ kids: response.data });

      if (response) {
        const { kids } = this.state;
        let defaultKids = kids[0];
        this.setState({ defaultKid: defaultKids });
      }
      console.log(response);
    } catch (e) {
      console.log("Something went wrong", e);
    }
  };

  renderKidsHelper = () => {
    const { kids } = this.state;
    let kid = kids.map((kid) => (
      <a
        className="kid-name"
        href="#vcgh"
        key={kid.id}
        onClick={() => this.onClickHandler(kid)}
      >
        <i className="fas fa-user-graduate pr-2"></i>
        {`${kid.user.firstName} ${kid.user.lastName}`}
      </a>
    ));

    return kid;
  };

  onClickHandler = (kid) => {
    this.setState({
      defaultKid: kid,
    });
  };

  renderContentHelper = () => {
    const { selected, kids, defaultKid } = this.state;

    if (kids.length === 0) {
      return <ParentAddChildMessage />;
    }

    let username;
    let firstname;
    let lastname;

    if (defaultKid) {
      username = defaultKid.user.username;
      firstname = defaultKid.user.firstName;
      lastname = defaultKid.user.lastName;

      if (selected === "assignment-view") {
        return (
          <ParentViewStudentAssignment
            username={username}
            firstName={firstname}
            lastName={lastname}
          />
        );
      } else if (selected === "assessment-view") {
        return (
          <ParentViewStudentAssessment
            username={username}
            firstName={firstname}
            lastName={lastname}
          />
        );
      } else if (selected === "time-table") {
        return (
          <ChildTimeTable
            username={username}
            firstName={firstname}
            lastName={lastname}
          />
        );
      }
    }
  };

  redirectToChildHandler = () => {
    this.props.history.push("/child/signup");
  };

  onAssessmentViewHandler = () => {
    this.setState({ selected: "assessment-view" });
  };

  onTimeTableViewHandler = () => {
    this.setState({ selected: "time-table" });
  };

  onAssignmentViewHandler = () => {
    this.setState({ selected: "assignment-view" });
  };

  render() {
    return (
      <>
        <input type="checkbox" id="check" />
        <nav className="navbar navbar-expand-lg navbar-light parent-home__header py-2">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto teacher-home__links">
              <li>
                <label htmlFor="check">
                  <i className="fas fa-bars" id="sidebar_btn"></i>
                </label>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#ghchc"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Family Portal
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a
                    className="dropdown-item"
                    href="#jhvhj"
                    onClick={() => this.redirectToChildHandler()}
                  >
                    Add a kid account
                  </a>
                  <a className="dropdown-item" href="#gcgc">
                    View kids account
                  </a>
                  <a className="dropdown-item" href="#gcgc">
                    Pricing plans
                  </a>
                  <a className="dropdown-item" href="#gcgc">
                    Tell a friend
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#ghchc"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Perfomance
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a
                    className="dropdown-item"
                    href="#jhvhj"
                    name="assessment-view"
                    onClick={this.onAssessmentViewHandler}
                  >
                    View assessments
                  </a>
                  <a
                    className="dropdown-item"
                    href="#gcgc"
                    name="assignment-view"
                    onClick={this.onAssignmentViewHandler}
                  >
                    View assignments
                  </a>
                  <a className="dropdown-item" href="#ghcgcgcgh">
                    Teachers feedback
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#ghchc"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Childs Attendance
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#jhvhj">
                    View attendance
                  </a>
                  <a
                    className="dropdown-item"
                    href="#gcgc"
                    onClick={this.onTimeTableViewHandler}
                  >
                    View time table
                  </a>
                  <a className="dropdown-item" href="#gcgc">
                    Lesson Material
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#ghchc"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  My Account
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#jhvhj">
                    Sign out
                  </a>
                  <a className="dropdown-item" href="#gcgc">
                    Change password
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <div className="sidenav">
          <a href="#jhfgjhf" className="parent-avatar">
            <i className="fas fa-user fa-5x pl-5 pb-2"></i>
            <span className="parent-account__name pl-3 pb-3">
              Signed In as {localStorage.getItem("firstName")}
            </span>
          </a>
          {this.renderKidsHelper()}
        </div>

        <div className="content p-2">{this.renderContentHelper()}</div>
      </>
    );
  }
}

export default connect(null, { fetchStudentLessons })(ParentLandingPage);
