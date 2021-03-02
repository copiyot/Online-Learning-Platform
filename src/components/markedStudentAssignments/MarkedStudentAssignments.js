import React from "react";
import { connect } from "react-redux";
import { MDBDataTableV5 } from "mdbreact";

import "../teacherFeedback/TeacherFeedback.css";

class MarkedStudentAssignments extends React.Component {
  state = { assignments: this.props.assignment, filteredAssignments: [] };

  componentWillMount() {
    this.filterAssignments();
  }

  filterAssignments = () => {
    const { assignments } = this.state;

    const assign = assignments.filter(
      (assignment) => assignment.marked === true
    );

    this.setState({ filteredAssignments: assign });
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
      rows: this.state.filteredAssignments.map((assignment) => {
        return {
          subject: assignment.subject.name,
          title: assignment.name,
          description: assignment.description,
          marks: assignment.scoredMarks,
          teacher: `${assignment.teacher.user.firstName} ${assignment.teacher.user.lastName}`,
        };
      }),
    };

    return (
      <div className="marked-studentAssignment__content">
        <div className="student-assessment__title mb-2">MARKED ASSIGNMENTS</div>
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
    assignment: state.assignment.studentAssignment,
  };
};

export default connect(mapStateToProps)(MarkedStudentAssignments);
