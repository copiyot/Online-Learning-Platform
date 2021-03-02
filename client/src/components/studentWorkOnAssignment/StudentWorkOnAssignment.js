import React from "react";
import axios from "axios";
import { saveAs } from "file-saver";

import { BASE_URL } from "../api";
import "./StudentWorkOnAssignment.css";
import StudentQuestions from "./StudentQuestions";

class StudentWorkOnAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { assignment: [], answers: "", selectedFile: null };
    this.child = React.createRef();
  }

  componentDidMount() {
    this.fetchAssignment();
  }

  fetchAssignment = async () => {
    try {
      const response = await axios.get(
        BASE_URL + "secured/assessment/findAssessmentById/" + this.props.id
      );

      this.setState({ assignment: response.data });
    } catch (e) {
      console.log("Error Logged", e);
    }
  };

  downloadFileHandler = async (path) => {
    console.log(path);
    try {
      axios({
        url: BASE_URL + "secured/assessment/download/" + path,
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        saveAs(response.data, path);
      });
    } catch (e) {
      console.log("unable to download file:" + e);
    }
  };

  onSubmitHandler = () => {
    this.child.current.onSubmitHandler();
  };

  onFileChangeHandler = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  onFileSubmitHandler = async () => {
    const formData = new FormData();

    formData.append("file", this.state.selectedFile);

    formData.append("studentId", localStorage.getItem("studentId"));

    formData.append("assessmentId", this.state.assignment.id);

    try {
      const response = await axios.post(
        BASE_URL + "secured/assessment/save/student/attached-assessment",
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      alert(response.data.message);
    } catch (e) {
      console.log("Something went wrong", e);
    }
  };

  render() {
    const { assignment } = this.state;

    return (
      <div className="work-on__assignment">
        <div className="card student-assignment__header p-2 mb-2">
          <div className="row">
            <div className="col-md-6">
              <div className="student-assignment__title mb-2">
                <span className="assignment-title__label mr-2">Title:</span>
                <span>{assignment.name}</span>
              </div>
              <div className="student-assignment__description mb-2">
                <span className="assignment-description__label mr-2">
                  Assignment Description:
                </span>
                <span>{assignment.description}</span>
              </div>
              <div className="student-assignment__returnDate">
                <span className="assignment-returnDate__label mr-2">
                  Assignment Due Date:
                </span>
                <span>{assignment.dateExpected}</span>
              </div>
            </div>
            <div className="col-md-6">
              {assignment.filePath ? (
                <div className="assignment-filePath__view">
                  <span className="mr-2">
                    <strong> Download assignment:</strong>
                  </span>
                  <span
                    className="assignment-filepath__link pb-2"
                    onClick={() =>
                      this.downloadFileHandler(assignment.filePath)
                    }
                  >
                    {assignment.filePath}
                  </span>
                </div>
              ) : (
                <div></div>
              )}
              {assignment.filePath ? (
                <form className="mt-2">
                  <div className="form-group">
                    <label htmlFor="assignment-file__form">
                      {" "}
                      <span className="upload-file__label">
                        <strong>Upload Assignment:</strong>
                      </span>
                    </label>
                    <input
                      type="file"
                      className="form-control-file"
                      id="assignment-file__form"
                      onChange={this.onFileChangeHandler}
                    />
                  </div>
                </form>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
        <StudentQuestions
          questions={assignment.questions}
          ref={this.child}
          id={this.props.id}
        />

        <div className="back-save__buttons">
          <button
            type="button"
            className="btn back-button mb-3"
            onClick={this.props.handler}
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back
          </button>
          <button
            type="button"
            className="btn save-button mb-3"
            onClick={
              assignment.filePath
                ? () => this.onFileSubmitHandler()
                : () => this.onSubmitHandler()
            }
          >
            <i className="far fa-save mr-2"></i>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default StudentWorkOnAssignment;
