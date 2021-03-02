import React from "react";
import { MDBDataTableV5 } from "mdbreact";
import { connect } from "react-redux";

import "./StudentAssessment.css";
import StudentWorkOnAssignment from "../studentWorkOnAssignment/StudentWorkOnAssignment";

class AssessmentDue extends React.Component {
  state = { assessments: [], id: "", selected: "assessment-list" };

  componentWillMount() {
    let dueAssessments = this.props.assessments.filter(
      (assign) => new Date() < new Date(assign.dateExpected)
    );

    this.setState({ assessments: dueAssessments });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ assignments: nextProps.assessments });
  }

  onClickHandler = (id) => {
    this.setState({ selected: "assignment-work__on" });
    this.setState({ id });
  };

  toInitialStateHandler = () => {
    this.setState({ selected: "assessment-list" });
    console.log("assessment");
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
      rows: this.state.assessments.map((assessment) => {
        return {
          subject: assessment.subject.name,
          title: assessment.name,
          description: assessment.description,
          dateExpected: assessment.dateExpected.substring(
            0,
            assessment.dateExpected.indexOf("T")
          ),
          teacher: `${assessment.teacher.user.firstName} ${assessment.teacher.user.lastName}`,
          startAssessment: (
            <button
              type="button"
              className="btn student-start__assessment py-2"
              onClick={() => this.onClickHandler(assessment.id)}
            >
              Start Assessment
              <i className="fa fa-play" aria-hidden="true"></i>
            </button>
          ),
        };
      }),
    };

    if (selected === "assessment-list") {
      return (
        <div className="student-assessment__content">
          <div className="student-assessment__title mb-2">ASSESSMENTS</div>
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
    assessments: state.assignment.studentAssessment,
  };
};

export default connect(mapStateToProps)(AssessmentDue);
