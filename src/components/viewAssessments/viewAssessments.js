import React from "react";
import { connect } from "react-redux";
import Axios from "axios";

import "../viewAssignments/ViewAssignments.css";
import { MDBDataTableV5 } from "mdbreact";
import ViewAssignment from "../viewAssignments/ViewAssignment";
import EditAssignment from "../viewAssignments/EditAssignment";
import { fetchAssessments } from "../../actions";
import { BASE_URL } from "../api";

class ViewAssessments extends React.Component {
  state = { assignments: [], selected: "assignment-list", id: null };

  componentWillMount() {
    this.setState({ assignments: this.props.display });
    this.props.fetchAssessments();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ assignments: nextProps.display });
  }

  onClickHandler = (id) => {
    this.setState({ selected: "view" });
    this.setState({ id });
  };

  toInitialStateHandler = () => {
    this.setState({ selected: "assignment-list" });
  };

  onEditClickHandler = (id) => {
    this.setState({ selected: "edit" });
    this.setState({ id });
  };

  onDeleteClickHandler = async (id) => {
    try {
      const response = await Axios.delete(
        BASE_URL + `secured/assessment/deleteAssessment/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      alert(response.data.message);
    } catch (e) {
      console.log("Failed to create assignment" + e);
    }
  };

  renderHelper = () => {
    const { assignments, selected, id } = this.state;

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
        {
          label: "Edit",
          field: "edit",
          sort: "asc",
          width: 200,
        },
        {
          label: "Delete",
          field: "delete",
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
              onClick={() => this.onClickHandler(assignment.id)}
            >
              View
              <i className="fas fa-eye ml-2" aria-hidden="true"></i>
            </button>
          ),
          edit: (
            <button
              type="button"
              className="btn not-submitted__assignments"
              onClick={() => this.onEditClickHandler(assignment.id)}
            >
              Edit
              <i className="far fa-edit ml-2"></i>
            </button>
          ),
          delete: (
            <button
              type="button"
              className="btn not-submitted__assignments"
              onClick={() => this.onDeleteClickHandler(assignment.id)}
            >
              Delete
              <i className="fas fa-trash-alt ml-2"></i>
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
    } else if (selected === "view") {
      return <ViewAssignment id={id} handler={this.toInitialStateHandler} />;
    } else if (selected === "edit") {
      return (
        <EditAssignment
          id={id}
          handler={this.toInitialStateHandler}
          category={"1"}
        />
      );
    }
  };

  render() {
    return <div className="view-assignment__option">{this.renderHelper()}</div>;
  }
}

export default connect(null, { fetchAssessments })(ViewAssessments);
