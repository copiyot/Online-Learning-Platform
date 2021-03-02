import React, { Component } from "react";

import "./ChildHomePage.css";
import StudentsClassRoom from "../studentClassRoom/StudentClassRoom";
import StudentLesson from "../studentLessons/StudentLesson";
import StudentAssignment from "../studentAssignment/StudentAssignment";
import StudentAssessment from "../studentAssessment/StudentAssessment";
import TeacherFeedback from "../teacherFeedback/TeacherFeedback";

class ChildHomePage extends Component {
  state = { display: "enrol-student" };

  renderHelper() {
    const { display } = this.state;

    if (display === "enrol-student") {
      return (
        <StudentsClassRoom handler={this.setStudentLessonHandler.bind(this)} />
      );
    } else if (display === "student-lesson") {
      return <StudentLesson />;
    } else if (display === "student-assignment") {
      return <StudentAssignment />;
    } else if (display === "student-assessment") {
      return <StudentAssessment />;
    } else if (display === "teacher-feedback") {
      return <TeacherFeedback />;
    }
  }

  returnHomeHandler() {
    this.setState({ display: "enrol-student" });
  }

  setStudentLessonHandler() {
    this.setState({ display: "student-lesson" });
  }

  setStudentAssigntmentHandler() {
    this.setState({ display: "student-assignment" });
  }

  setStudentAssessmentHandler() {
    this.setState({ display: "student-assessment" });
  }

  setTeachersFeedBack() {
    this.setState({ display: "teacher-feedback" });
  }

  render() {
    return (
      <div className="child-home__page">
        <nav className="navbar navbar-expand-lg navbar-light teacher-home__header py-2">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbar-teacher__home"
            aria-controls="navbar-teacher__home"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbar-teacher__home">
            <ul className="navbar-nav teacher-home__links">
              <li
                className="mt-2 home-menu"
                onClick={() => this.returnHomeHandler()}
              >
                <span>
                  <i className="fa fa-home" aria-hidden="true"></i> Home
                </span>
              </li>
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Lesson
                </span>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <span
                    className="dropdown-item"
                    onClick={() => this.setStudentLessonHandler()}
                  >
                    Lessons
                  </span>
                  <span className="dropdown-item">Lesson Notes</span>
                  <span className="dropdown-item">Revision Papers</span>
                </div>
              </li>
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Performance
                </span>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <span
                    className="dropdown-item"
                    onClick={() => this.setStudentAssessmentHandler()}
                  >
                    View Assessments
                  </span>
                  <span
                    className="dropdown-item"
                    onClick={() => this.setStudentAssigntmentHandler()}
                  >
                    View Assignments
                  </span>
                  <span
                    className="dropdown-item"
                    onClick={() => this.setTeachersFeedBack()}
                  >
                    Teachers Feedback
                  </span>
                </div>
              </li>
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Attendance
                </span>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <span className="dropdown-item">View Attendance Charts</span>
                  <span className="dropdown-item">View Time Table</span>
                </div>
              </li>
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-user" aria-hidden="true"></i>{" "}
                  <span className="my-account__name">
                    {localStorage.getItem("firstName")}
                  </span>
                </span>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <span className="dropdown-item" href="#jhvhj">
                    Sign out
                  </span>
                  <span className="dropdown-item" href="#gcgc">
                    Change password
                  </span>
                  <span className="dropdown-item" href="#gcgc">
                    Tell a Friend
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <div className="child-home__display pt-4">
          <div className="container display-student__content">
            {this.renderHelper()}
          </div>
        </div>
      </div>
    );
  }
}

export default ChildHomePage;
