import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { setIsSignedIn } from "../../actions";
import { BASE_URL } from "../api";
import "./ChildHomePage.css";
import StudentsClassRoom from "../studentClassRoom/StudentClassRoom";
import StudentLesson from "../studentLessons/StudentLesson";
import StudentAssignment from "../studentAssignment/StudentAssignment";
import StudentAssessment from "../studentAssessment/StudentAssessment";
import TeacherFeedback from "../teacherFeedback/TeacherFeedback";
import AssignmentDue from "../studentAssignment/AssignmentDue";
import AssignmentPastDue from "../studentAssignment/AssignmentPastDue";
import AssignmentCompleted from "../studentAssignment/AssignmentCompleted";
import AssessmentDue from "../studentAssessment/AssessmentDue";
import AssessmentPastDue from "../studentAssessment/AssessmentPastDue";
import AssessmentCompleted from "../studentAssessment/AssessmentCompleted";
import ChildTimeTable from "../childTimeTable/ChildTimeTable";

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
    } else if (display === "student-assignment-due") {
      return <AssignmentDue />;
    } else if (display === "student-assignment-pastDue") {
      return <AssignmentPastDue />;
    } else if (display === "student-assignment-completed") {
      return <AssignmentCompleted />;
    } else if (display === "student-assessment-due") {
      return <AssessmentDue />;
    } else if (display === "student-assessment-pastDue") {
      return <AssessmentPastDue />;
    } else if (display === "student-assessment-completed") {
      return <AssessmentCompleted />;
    } else if (display === "student-timeTable") {
      return (
        <ChildTimeTable
          username={localStorage.getItem("username")}
          firstName={localStorage.getItem("firstName")}
          lastName={localStorage.getItem("lastName")}
        />
      );
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

  setStudentAssigntmentDueHandler() {
    this.setState({ display: "student-assignment-due" });
  }

  setStudentAssigntmentPastDueHandler() {
    this.setState({ display: "student-assignment-pastDue" });
  }

  setStudentAssigntmentCompletedHandler() {
    this.setState({ display: "student-assignment-completed" });
  }

  setStudentAssessmentDueHandler() {
    this.setState({ display: "student-assessment-due" });
  }

  setStudentAssessmentPastDueHandler() {
    this.setState({ display: "student-assessment-pastDue" });
  }

  setStudentAssessmentCompletedHandler() {
    this.setState({ display: "student-assessment-completed" });
  }

  setStudentTimeTable() {
    this.setState({ display: "student-timeTable" });
  }

  revokeToken = async () => {
    let token = localStorage.getItem("token");

    let data = {
      tokenId: token,
    };

    await axios.post(BASE_URL + "token/revoke", data);
  };

  signOutClickHandler = () => {
    this.props.setIsSignedIn(false);
    this.revokeToken();
  };

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
                  My Performance
                </span>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <span
                    className="dropdown-item"
                    onClick={() => this.setStudentLessonHandler()}
                  >
                    Lessons
                  </span>
                  <span
                    className="dropdown-item"
                    onClick={() => this.setStudentAssessmentHandler()}
                  >
                    Assessments
                  </span>
                  <span
                    className="dropdown-item"
                    onClick={() => this.setStudentAssigntmentHandler()}
                  >
                    Assignments
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
                  My Lessons
                </span>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <span
                    className="dropdown-item"
                    onClick={() => this.setStudentTimeTable()}
                  >
                    Time table
                  </span>
                  <span className="dropdown-item">Enrolled Lessons</span>
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
                  My Assignments
                </span>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <span
                    className="dropdown-item"
                    onClick={() => this.setStudentAssigntmentDueHandler()}
                  >
                    Assignments Due
                  </span>
                  <span
                    className="dropdown-item"
                    onClick={() => this.setStudentAssigntmentPastDueHandler()}
                  >
                    Past due assignments
                  </span>
                  <span
                    className="dropdown-item"
                    onClick={() => this.setStudentAssigntmentCompletedHandler()}
                  >
                    Completed assignments
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
                  My Assessments
                </span>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <span
                    className="dropdown-item"
                    onClick={() => this.setStudentAssessmentDueHandler()}
                  >
                    Assessments Due
                  </span>
                  <span
                    className="dropdown-item"
                    onClick={() => this.setStudentAssessmentPastDueHandler()}
                  >
                    Past due assessments
                  </span>
                  <span
                    className="dropdown-item"
                    onClick={() => this.setStudentAssessmentCompletedHandler()}
                  >
                    Completed assessments
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
                  <i className="fa fa-user" aria-hidden="true"></i>{" "}
                  <span className="my-account__name">
                    {localStorage.getItem("firstName")}
                  </span>
                </span>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <span
                    className="dropdown-item"
                    href="#jhvhj"
                    onClick={this.signOutClickHandler}
                  >
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

export default connect(null, { setIsSignedIn })(ChildHomePage);
