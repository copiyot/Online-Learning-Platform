import React from "react";
import axios from "axios";
import { MDBDataTableV5 } from "mdbreact";

import { BASE_URL } from "../api";
import MarkAssigment from "../markAssignment/MarkAssignment";

class MarkAssessment extends React.Component {
  state = {
    assessments: [],
    selected: "assessment-list",
    id: null,
    selectedAssignment: "",
  };

  componentWillMount() {
    this.fetchMarkedAssessment();
  }

  fetchMarkedAssessment = async () => {
    try {
      const response = await axios.get(
        BASE_URL +
          `secured/assessment/findSubmittedAssessmentByTeacherId/${localStorage.getItem(
            "teacherId"
          )}/2`
      );

      this.setState({ assessments: response.data });
      console.log(response);
    } catch (e) {
      console.log("Fetching submitted assignments failed", e);
    }
  };

  onClickHandler = (id, assignment) => {
    this.setState({ selected: "mark", selectedAssignment: assignment });
    this.setState({ id });
  };

  toInitialStateHandler = () => {
    this.setState({ selected: "assessment-list" });
  };

  renderHelper = () => {
    const { assessments, selected, id, selectedAssignment } = this.state;

    const data = {
      columns: [
        {
          label: "Grade",
          field: "grade",
          width: 200,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "Name",
          },
        },
        {
          label: "Assignment Name",
          field: "assignmentName",
          width: 200,
        },
        {
          label: "Subject",
          field: "subject",
          sort: "asc",
          width: 200,
        },
        {
          label: "Date Created",
          field: "dateCreated",
          sort: "asc",
          width: 200,
        },
        {
          label: "Mark Assessment",
          field: "view",
          sort: "asc",
          width: 200,
        },
      ],
      rows: assessments.map((assignment) => {
        return {
          grade: assignment.grade,
          assignmentName: assignment.name,
          subject: assignment.subject.name,
          dateCreated: assignment.dateCreated,
          view: (
            <button
              type="button"
              className="btn not-submitted__assignments"
              onClick={() => this.onClickHandler(assignment.id, assignment)}
            >
              Mark
              <i className="fas fa-eye ml-2" aria-hidden="true"></i>
            </button>
          ),
        };
      }),
    };

    if (selected === "assessment-list") {
      return (
        <div className="view-assignments my-5 p-3">
          <div className="table-heading mb-3">MARK ASSESSMENTS</div>
          <div className="view-assignment__buttons">
            {/* <button
              type="button"
              className="btn submitted-assignments mr-3 mb-2"
            >
              {this.props.pastAssign}
              <i className="fas fa-eye ml-2" aria-hidden="true"></i>
            </button>
            <button
              type="button"
              className="btn not-submitted__assignments mb-2"
            >
              {this.props.pastSub}
              <i className="fas fa-eye ml-2" aria-hidden="true"></i>
            </button> */}
          </div>
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
      );
    } else if (selected === "mark") {
      return (
        <MarkAssigment
          id={id}
          handler={this.toInitialStateHandler}
          selectedAssignment={selectedAssignment}
        />
      );
    }
  };

  render() {
    return <div className="mark-assessment">{this.renderHelper()}</div>;
  }
}

export default MarkAssessment;
