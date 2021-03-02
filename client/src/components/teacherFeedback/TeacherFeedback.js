import React from "react";

import "./TeacherFeedback.css";
import MarkedStudentAssignments from "../markedStudentAssignments/MarkedStudentAssignments";
import MarkedStudentAssessments from "../markedStudentAssessment/MarkedStudentAssessment";

class TeacherFeedback extends React.Component {
  render() {
    return (
      <div className="teacher-feedback">
        <MarkedStudentAssignments />
        <MarkedStudentAssessments />
      </div>
    );
  }
}

export default TeacherFeedback;
