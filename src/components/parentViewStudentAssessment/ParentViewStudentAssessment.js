import React from "react";
import { MDBDataTableV5 } from "mdbreact";
import { connect } from "react-redux";
import Axios from "axios";

import "../parentViewStudentAssignment/ParentViewStudentAssignment.css";
import { BASE_URL } from "../api";

class ParentViewStudentAssignment extends React.Component {
  state = { assignments: [], id: "" };

  componentDidMount() {
    this.fetchStudentAssignments(this.props.username);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.username !== this.props.username) {
      this.fetchStudentAssignments(nextProps.username);
    }
  }

  fetchStudentAssignments = async (username) => {
    try {
      const response = await Axios.get(
        BASE_URL + `secured/assessment/student-assessments/${username}/2`,
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
          label: "Date Expected",
          field: "dateExpected",
          width: 200,
        },
        {
          label: "Teacher",
          field: "teacher",
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
        };
      }),
    };

    return (
      <div className="teacher-kid__content">
        <div className="student-assessment__title mb-2">
          {" "}
          <span className="kid-name">{`${this.props.firstName} ${this.props.lastName} ASSESSMENTS`}</span>{" "}
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
  }
}

const mapStateToProps = (state) => {
  return {
    assignment: state.assignment.studentAssignment,
  };
};

export default connect(mapStateToProps)(ParentViewStudentAssignment);
