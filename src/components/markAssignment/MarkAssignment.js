import React from "react";
import axios from "axios";

import "./MarkAssigment.css";
import { BASE_URL } from "../api";
import { MDBDataTableV5 } from "mdbreact";
import Assignment from "./Assignment";

class MarkAssignment extends React.Component {
  state = {
    students: [],
    view: "student-list",
    questions: [],
    assessmentId: "",
    studentId: "",
  };

  componentWillMount() {
    this.fetchStudents();
  }

  fetchStudents = async () => {
    try {
      const response = await axios.get(
        BASE_URL +
          "secured/assessment/findStudentsAssessment/answered-questions/" +
          this.props.id,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      this.setState({ students: response.data });
      console.log(response);
    } catch (e) {
      console.log("Failed to fetch Sudents", e);
    }
  };

  onClickHandler = (questions, studentId, assessmentId) => {
    this.setState({
      view: "mark-student__assignment",
      questions,
      studentId,
      assessmentId,
    });
  };

  setToInitialState = () => {
    this.setState({ view: "student-list" });
  };

  renderHelper = () => {
    const { students, view } = this.state;

    const data = {
      columns: [
        {
          label: "Student",
          field: "student",
          width: 200,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "Name",
          },
        },
        {
          label: "Is Marked?",
          field: "marked",
          width: 200,
        },
        {
          label: "Mark Exam",
          field: "mark",
          width: 200,
        },
      ],
      rows: students.map((student) => {
        return {
          student: `${student.firstName} ${student.lastName}`,
          marked: `${student.marked ? "Yes" : "No"}`,
          mark: (
            <button
              type="button"
              className="btn not-submitted__assignments"
              onClick={() =>
                this.onClickHandler(
                  student.questions,
                  student.id,
                  student.assessmentId
                )
              }
            >
              Mark
              <i className="fas fa-eye ml-2" aria-hidden="true"></i>
            </button>
          ),
        };
      }),
    };

    if (view === "student-list") {
      return (
        <div className="mark-students__assignments p-3">
          <MDBDataTableV5
            hover
            entriesOptions={[5, 20, 25]}
            entries={5}
            pagesAmount={4}
            data={data}
            searchTop
            searchBottom={false}
          />
          <button
            type="button"
            className="btn back-button"
            onClick={this.props.handler}
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back
          </button>
        </div>
      );
    } else if (view === "mark-student__assignment") {
      return (
        <Assignment
          questions={this.state.questions}
          handler={this.setToInitialState}
          assessmentId={this.state.assessmentId}
          studentId={this.state.studentId}
          assignment={this.props.selectedAssignment}
        />
      );
    }
  };

  render() {
    return (
      <div className="mark-students__container">
        <div className=" mt-5">{this.renderHelper()}</div>
      </div>
    );
  }
}

export default MarkAssignment;
