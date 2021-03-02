import React, { Component } from "react";
import { connect } from "react-redux";

import "./ClassRoom.css";
import {
  fetchWorkItems,
  fetchLessons,
  fetchSchemeOfWork,
  fetchSubjects,
  fetchTopic,
  fetchSubTopic,
  fetchAssignments,
  fetchAssessments,
  fetchTeacherSelectedSubjects,
} from "../../actions";

class ClassRoom extends Component {
  componentDidMount() {
    this.props.fetchWorkItems();
    this.props.fetchLessons();
    this.props.fetchSchemeOfWork();
    this.props.fetchSubjects();
    this.props.fetchTopic();
    this.props.fetchSubTopic();
    this.props.fetchAssignments();
    this.props.fetchAssessments();
    this.props.fetchTeacherSelectedSubjects();
  }

  render() {
    return (
      <div className="class-room mt-5 p-3">
        <div className="class-room__content">
          <div className="goto-classroom__label">Go to classroom</div>
          <div className="class-link mb-3">
            Click the below link to join the classroom to start your lessons:{" "}
            <span
              className="lesson-redirect"
              onClick={() => this.props.handler()}
            >
              here
            </span>
          </div>
          <div className="view-lesson btn">
            View lesson timetable
            <i className="fa fa-arrow-right" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {
  fetchWorkItems,
  fetchLessons,
  fetchSchemeOfWork,
  fetchSubjects,
  fetchTopic,
  fetchSubTopic,
  fetchAssignments,
  fetchAssessments,
  fetchTeacherSelectedSubjects,
})(ClassRoom);
