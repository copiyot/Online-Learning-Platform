import React from "react";
import { connect } from "react-redux";

import "./StudentClassRoom.css";
import {
  fetchSubjects,
  fetchStudentAssessments,
  fetchStudentAssignments,
  fetchStudentLessons,
} from "../../actions";
import EnrolStudent from "../enrolStudent/EnrolStudent";

class StudentClassRoom extends React.Component {
  componentDidMount() {
    this.props.fetchSubjects();
    this.props.fetchStudentAssessments();
    this.props.fetchStudentAssignments();
    this.props.fetchStudentLessons();
  }

  render() {
    return (
      <div className="student-class__room pt-5">
        <div className="go-to__classroom">Go to classroom</div>
        <div className="class-link__student mb-2">
          Click the below link to join the classroom to start your lessons:
        </div>
        <div className="btn enrol-link mb-5" onClick={this.props.handler}>
          Start Lesson <i className="fa fa-book" aria-hidden="true"></i>
        </div>
        <div className="enroll-classroom">
          Enrol to a class by clicking the below link:
        </div>
        <div
          className="btn enrol-link mt-2"
          data-toggle="modal"
          data-target="#student-enrolment"
        >
          Enrol <i className="fa fa-graduation-cap" aria-hidden="true"></i>
        </div>
        <EnrolStudent />
      </div>
    );
  }
}

export default connect(null, {
  fetchSubjects,
  fetchStudentAssessments,
  fetchStudentAssignments,
  fetchStudentLessons,
})(StudentClassRoom);
