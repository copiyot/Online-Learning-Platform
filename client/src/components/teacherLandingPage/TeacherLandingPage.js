import React from "react";
import { connect } from "react-redux";
import Axios from "axios";

import { setIsSignedIn } from "../../actions";
import "./TeacherLandingPage.css";
import SchemeOfWork from "../schemeOfWork/SchemeOfWork";
import SchemeOfWorkItem from "../schemeOfWorkItem/SchemeOfWorkItem";
import ClassRoom from "../classRoom/ClassRoom";
import Subject from "../subject/Subject";
import Topic from "../topic/Topic";
import SubTopic from "../subTopic/SubTopic";
import LessonPlan from "../lessonPlan/LessonPlan";
import SendInvite from "../sendInvite/SendInvite";
import TimeTable from "../timeTable/TimeTable";
import CreateAssignmentOption from "../createAssignmentOption/CreateAssignmentOption";
import CreateAssessmentOption from "../createAssessmentOption/CreateAssessmentOption";
import MarkAssignment from "../markAssignment/MarkAssignments";
import ViewAssignment from "../viewAssignments/ViewAssignments";
import ViewAssessment from "../viewAssessments/ViewAssessments";
import ViewAssignmentSubmitted from "../viewAssignmentSubmitted/ViewAssignmentSubmitted";
import ViewAssessmentsSubmitted from "../viewAssessmentsSubmitted/ViewAssessmentsSubmitted";
import MarkAssessment from "../markAssessment/MarkAssessments";
import TeacherSelectedSubjects from "../TeacherSelectedSubject/TeacherSelectedSubject";
import { BASE_URL } from "../api";

class TeacherLandingPage extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { selected: "goToSchool" };
  //   this.childTopics = React.createRef();
  // }
  state = {
    selected: "goToSchool",
  };

  renderhandler() {
    // let selected = this.state.selected;
    const { selected } = this.state;

    if (selected === "goToSchool") {
      return <ClassRoom handler={this.planLessonOnClickHandler.bind(this)} />;
    } else if (selected === "schemeOfWorks") {
      return (
        <>
          <SchemeOfWork />
          <SchemeOfWorkItem />
        </>
      );
    } else if (selected === "lessonPlan") {
      return <LessonPlan />;
    } else if (selected === "subject") {
      return (
        <>
          <Subject />
          <TeacherSelectedSubjects />
          <Topic />
          <SubTopic />
        </>
      );
    } else if (selected === "timetable") {
      return <TimeTable />;
    } else if (selected === "createAssignment") {
      return <CreateAssignmentOption />;
    } else if (selected === "markAssignment") {
      return (
        <MarkAssignment
          pastAssign="Past Submitted assignments"
          pastSub="Past Assignments not Submitted"
        />
      );
    } else if (selected === "viewAssignment") {
      return (
        <ViewAssignment
          display={this.props.assignments}
          pastAssign="Past Submitted assignments"
          pastSub="Past Assignments not Submitted"
        />
      );
    } else if (selected === "viewAssignmentSubmitted") {
      return (
        <ViewAssignmentSubmitted
          display={this.props.assignments}
          pastAssign="Past Submitted assignments"
          pastSub="Past Assignments not Submitted"
        />
      );
    } else if (selected === "createAssessment") {
      return <CreateAssessmentOption />;
    } else if (selected === "viewAssessment") {
      return (
        <ViewAssessment
          display={this.props.assessments}
          pastAssign="Past Submitted assessments"
          pastSub="Past Assessments not Submitted"
        />
      );
    } else if (selected === "markAssessment") {
      return (
        <MarkAssessment
          pastAssign="Past Submitted Assessment"
          pastSub="Past Assessment not Submitted"
        />
      );
    } else if (selected === "viewAssessmentsSubmitted") {
      return (
        <ViewAssessmentsSubmitted
          display={this.props.assessments}
          pastAssign="Past Submitted assessments"
          pastSub="Past Assessments not Submitted"
        />
      );
    }
  }

  redirectToParentHandler() {
    this.props.history.push("/parent/home");
  }

  planLessonOnClickHandler() {
    this.setState({ selected: "lessonPlan" });
  }

  schemeOfWorkOnClickHandler() {
    this.setState({ selected: "schemeOfWorks" });
  }

  subjectOnClickHandler() {
    this.setState({ selected: "subject" });
  }

  timetableOnClickHandler() {
    this.setState({ selected: "timetable" });
  }

  createAssignmentOnClickHandler() {
    this.setState({ selected: "createAssignment" });
  }

  CreateAssessmentOnClickHandler() {
    this.setState({ selected: "createAssessment" });
  }

  markAssignmentOnClickHandler() {
    this.setState({ selected: "markAssignment" });
  }

  viewAssignmentOnClickHandler() {
    this.setState({ selected: "viewAssignment" });
  }

  viewAssessmentOnClickHandler() {
    this.setState({ selected: "viewAssessment" });
  }

  viewAssignmentSubmittedOnClickHandler() {
    this.setState({ selected: "viewAssignmentSubmitted" });
  }

  ViewAssessmentsSubmittedOnClickHandler() {
    this.setState({ selected: "viewAssessmentsSubmitted" });
  }

  homeOnClickHandler() {
    this.setState({ selected: "goToSchool" });
  }

  viewMarkedAssessmentOnClickHandler() {
    this.setState({ selected: "markAssessment" });
  }

  revokeToken = async () => {
    let token = localStorage.getItem("token");

    let data = {
      tokenId: token,
    };

    await Axios.post(BASE_URL + "token/revoke", data);
  };

  signOutClickHandler = () => {
    this.props.setIsSignedIn(false);
    this.revokeToken();
  };

  render() {
    let role = localStorage.getItem("role");

    return (
      <div className="teacher-home">
        <nav className="navbar navbar-expand-lg navbar-light teacher-home__header fixed-top py-2">
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
              <li className="mt-2 home-menu">
                <span onClick={() => this.homeOnClickHandler()}>
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
                  Manage Students
                </span>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <span
                    className="dropdown-item"
                    data-toggle="modal"
                    data-target="#inviteStudents"
                  >
                    Invite students
                  </span>
                  <span className="dropdown-item">View students</span>
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
                  Plan Lessons
                </span>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <span
                    className="dropdown-item"
                    onClick={() => this.schemeOfWorkOnClickHandler()}
                  >
                    Scheme of Works
                  </span>
                  <span
                    className="dropdown-item"
                    onClick={() => this.planLessonOnClickHandler()}
                  >
                    Lesson plan
                  </span>
                  <span
                    className="dropdown-item"
                    onClick={() => this.timetableOnClickHandler()}
                  >
                    Time table
                  </span>
                  <span
                    className="dropdown-item"
                    onClick={() => this.subjectOnClickHandler()}
                  >
                    Subject
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
                  Manage Assignments
                </span>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <span
                    className="dropdown-item"
                    onClick={() => this.createAssignmentOnClickHandler()}
                  >
                    Create Assignment
                  </span>
                  <span
                    className="dropdown-item"
                    onClick={() => this.markAssignmentOnClickHandler()}
                  >
                    Mark Assignments
                  </span>
                  <span
                    className="dropdown-item"
                    onClick={() => this.viewAssignmentOnClickHandler()}
                  >
                    View past assignments set
                  </span>
                  <span
                    className="dropdown-item"
                    onClick={() => this.viewAssignmentSubmittedOnClickHandler()}
                  >
                    View past assignments submitted
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
                  Manage Assessments
                </span>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <span
                    className="dropdown-item"
                    onClick={() => this.CreateAssessmentOnClickHandler()}
                  >
                    Create Assessments
                  </span>
                  <span
                    className="dropdown-item"
                    onClick={() => this.viewMarkedAssessmentOnClickHandler()}
                  >
                    Mark Assessments
                  </span>
                  <span
                    className="dropdown-item"
                    onClick={() => this.viewAssessmentOnClickHandler()}
                  >
                    View past Assessments set
                  </span>
                  <span
                    className="dropdown-item"
                    onClick={() =>
                      this.ViewAssessmentsSubmittedOnClickHandler()
                    }
                  >
                    View past assignments submitted
                  </span>
                </div>
              </li>
              <li className="mt-2 home-menu">
                {role.length > 1 ? (
                  <span onClick={() => this.redirectToParentHandler()}>
                    Parent Dashboard{" "}
                    <i className="far fa-arrow-alt-circle-right"></i>
                  </span>
                ) : (
                  <div className=""></div>
                )}
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
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <div className="teacher-landing__page p-5">
          <div className="display-content container">
            <SendInvite />
            {this.renderhandler()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    assignments: state.assignment.data,
    assessments: state.assignment.assessment,
  };
};

export default connect(mapStateToProps, { setIsSignedIn })(TeacherLandingPage);
