import React from "react";
import { connect } from "react-redux";
import { MDBDataTableV5 } from "mdbreact";

import "../teacherFeedback/TeacherFeedback.css";

class MarkedStudentAssessments extends React.Component {
  state = { assessment: this.props.assessment, filteredAssessments: [] };

  componentWillMount() {
    this.filterAssignments();
  }

  filterAssignments = () => {
    const { assessment } = this.state;

    const assign = assessment.filter(
      (assignment) => assignment.marked === true
    );

    this.setState({ filteredAssessments: assign });
  };

  render() {
    const data = {
      columns: [
        {
          label: "Subject",
          field: "subject",
          width: 200,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "Name",
          },
        },
        {
          label: "Title",
          field: "title",
          width: 200,
        },
        {
          label: "Description",
          field: "description",
          width: 200,
        },
        {
          label: "Marks Scored",
          field: "marks",
          width: 200,
        },
        {
          label: "Teacher",
          field: "teacher",
          width: 200,
        },
      ],
      rows: this.state.filteredAssessments.map((assessment) => {
        return {
          subject: assessment.subject.name,
          title: assessment.name,
          description: assessment.description,
          marks: assessment.scoredMarks,
          teacher: `${assessment.teacher.user.firstName} ${assessment.teacher.user.lastName}`,
        };
      }),
    };

    return (
      <div className="marked-studentAssessment__content my-4">
        <div className="student-assessment__title mb-2">MARKED ASSESSMENTS</div>
        <div className="marked-student__assignment p-3">
          <MDBDataTableV5
            hover
            entriesOptions={[5, 20, 25]}
            entries={5}
            pagesAmount={4}
            data={data}
            searchTop
            searchBottom={false}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    assessment: state.assignment.studentAssessment,
  };
};

export default connect(mapStateToProps)(MarkedStudentAssessments);
