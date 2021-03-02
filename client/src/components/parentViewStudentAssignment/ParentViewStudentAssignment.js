import React from "react";
import { MDBDataTableV5 } from "mdbreact";
import { connect } from "react-redux";
import Axios from "axios";

import "./ParentViewStudentAssignment.css";
import { BASE_URL } from "../api";
import ViewStudentAssignment from "./ViewStudentAssignment";

class ParentViewStudentAssignment extends React.Component {
  state = {
    assignments: [],
    id: "",
    selected: "assignment-list",
    category: 1,
    studentId: "",
  };

  componentDidMount() {
    this.fetchStudentAssignments(this.props.username);
    this.setState({ studentId: this.props.id });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.username !== this.props.username) {
      this.fetchStudentAssignments(nextProps.username);
    }
  }

  fetchStudentAssignments = async (username) => {
    try {
      const response = await Axios.get(
        BASE_URL + `secured/assessment/student-assessments/${username}/1`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      console.log(response);

      this.setState({ assignments: response.data });
    } catch (e) {
      console.log("Failed to Fetch Assignments" + e);
    }
  };

  toInitialStateHandler = () => {
    this.setState({ selected: "assignment-list" });
  };

  onClickHandler = (id) => {
    this.setState({ id, selected: "view-assignment" });
  };

  renderHelper = () => {
    const { selected, id, category, studentId } = this.state;

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
          label: "Grade",
          field: "grade",
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
          label: "Is Marked?",
          field: "marked",
          width: 200,
        },
        {
          label: "Is Submitted?",
          field: "submitted",
          width: 200,
        },
        {
          label: "View",
          field: "view",
          width: 200,
        },
      ],
      rows: this.state.assignments.map((assignment) => {
        return {
          subject: assignment.subject.name,
          title: assignment.name,
          grade: assignment.grade,
          dateExpected: assignment.dateExpected.substring(
            0,
            assignment.dateExpected.indexOf("T")
          ),
          teacher: `${assignment.teacher.user.firstName} ${assignment.teacher.user.lastName}`,
          marked: `${assignment.marked ? "Yes" : "No"}`,
          submitted: `${assignment.submitted ? "Yes" : "No"}`,
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
        };
      }),
    };

    if (selected === "assignment-list") {
      return (
        <div className="teacher-kid__content">
          <div className="student-assessment__title mb-2">
            {" "}
            <span className="kid-name">{`${this.props.firstName} ${this.props.lastName} ASSIGNMENTS`}</span>{" "}
          </div>
          <div className="teacher-kid__assessment p-3">
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
    } else if (selected === "view-assignment") {
      return (
        <ViewStudentAssignment
          handler={this.toInitialStateHandler}
          id={id}
          category={category}
          studentId={studentId}
        />
      );
    }
  };

  render() {
    return <div className="">{this.renderHelper()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    assignment: state.assignment.studentAssignment,
  };
};

export default connect(mapStateToProps)(ParentViewStudentAssignment);
