import React from "react";
import { MDBDataTableV5 } from "mdbreact";
import { connect } from "react-redux";

import "./StudentAssignment.css";
import StudentWorkOnAssignment from "../studentWorkOnAssignment/StudentWorkOnAssignment";

class StudentAssignment extends React.Component {
  state = { assignments: [], id: "", selected: "assignment-list" };

  componentWillMount() {
    this.setState({ assignments: this.props.assignment });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ assignments: nextProps.assignment });
  }

  onClickHandler = (id) => {
    this.setState({ selected: "assignment-work__on" });
    this.setState({ id });
  };

  toInitialStateHandler = () => {
    this.setState({ selected: "assignment-list" });
    console.log("Just testing");
  };

  render() {
    const { selected, id } = this.state;

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
          label: "Date Expected",
          field: "dateExpected",
          width: 200,
        },
        {
          label: "Teacher",
          field: "teacher",
          width: 200,
        },
        {
          label: "Start Assessment",
          field: "startAssessment",
          width: 200,
        },
      ],
      rows: this.state.assignments.map((assignment) => {
        return {
          subject: assignment.subject.name,
          title: assignment.name,
          description: assignment.description,
          dateExpected: assignment.dateExpected.substring(
            0,
            assignment.dateExpected.indexOf("T")
          ),
          teacher: `${assignment.teacher.user.firstName} ${assignment.teacher.user.lastName}`,
          startAssessment: (
            <button
              type="button"
              className="btn student-start__assessment py-2"
              onClick={() => this.onClickHandler(assignment.id)}
            >
              Start Assignment
              <i className="fa fa-play" aria-hidden="true"></i>
            </button>
          ),
        };
      }),
    };

    if (selected === "assignment-list") {
      return (
        <div className="student-assessment__content">
          <div className="student-assessment__title mb-2">ASSIGNMENT</div>
          <div className="student-assessment p-3">
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
    } else if (selected === "assignment-work__on") {
      return (
        <StudentWorkOnAssignment handler={this.toInitialStateHandler} id={id} />
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    assignment: state.assignment.studentAssignment,
  };
};

export default connect(mapStateToProps)(StudentAssignment);
