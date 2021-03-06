import React from "react";
import axios from "axios";

import "./MarkAssigment.css";
import { MDBDataTableV5 } from "mdbreact";
import MarkAssigment from "./MarkAssignment";
import { BASE_URL } from "../api";

class MarkAssignments extends React.Component {
  state = {
    assignments: [],
    selected: "assignment-list",
    id: null,
    selectedAssignment: "",
  };

  componentWillMount() {
    this.fetchMarkedAssignment();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ assignments: nextProps.display });
  }

  fetchMarkedAssignment = async () => {
    try {
      const response = await axios.get(
        BASE_URL +
          `secured/assessment/findSubmittedAssessmentByTeacherId/${localStorage.getItem(
            "teacherId"
          )}/1`
      );

      console.log(response.data);

      this.setState({ assignments: response.data });
    } catch (e) {
      console.log("Fetching submitted assignments failed", e);
    }
  };

  onClickHandler = (id, assignment) => {
    this.setState({ selected: "mark", selectedAssignment: assignment });
    this.setState({ id });
  };

  toInitialStateHandler = () => {
    this.setState({ selected: "assignment-list" });
  };

  renderHelper = () => {
    const { assignments, selected, id, selectedAssignment } = this.state;

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
          label: "View Assignment",
          field: "view",
          sort: "asc",
          width: 200,
        },
      ],
      rows: assignments.map((assignment) => {
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

    if (selected === "assignment-list") {
      return (
        <div className="view-assignments my-5 p-3">
          <div className="view-assignment__buttons">
            <button
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
            </button>
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
    return <div className="view-assignment__option">{this.renderHelper()}</div>;
  }
}
export default MarkAssignments;
