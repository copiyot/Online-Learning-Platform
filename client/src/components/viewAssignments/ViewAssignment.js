import React, { Component } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

import "./ViewAssignments.css";
import { BASE_URL } from "../api";

class ViewAssignment extends Component {
  state = { assignment: null, name: "", questions: [] };

  componentWillMount() {
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

  render() {
    let { assignment } = this.state;

    if (assignment) {
      return (
        <div className="view-assignment mt-5 mb-3">
          <div className="assignment-header row">
            <div className="col-md-6">
              <div className="assignment-title__view mb-3">
                <span className="mr-2">
                  <strong> Title:</strong>
                </span>
                <span>{assignment.name}</span>
              </div>
              <div className="assignment-description__view">
                <span className="mr-2">
                  <strong> Description:</strong>
                </span>
                <span>{assignment.description}</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="assignment-grade__view mb-3">
                <span className="mr-2">
                  <strong> Grade:</strong>
                </span>
                <span>{assignment.grade}</span>
              </div>
              <div className="assignment-subject__view mb-3">
                <span className="mr-2">
                  <strong> Subject:</strong>
                </span>
                <span>{assignment.subjectName}</span>
              </div>
              <div className="assignment-return__date mb-3">
                <span className="mr-2">
                  <strong> Return Date:</strong>
                </span>
                <span>{assignment.dateExpected}</span>
              </div>
              {assignment.filePath ? (
                <div className="assignment-filePath__view">
                  <span className="mr-2">
                    <strong> File Path:</strong>
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
            </div>
          </div>
          {assignment.questions.map((question) => {
            return (
              <div
                className="card assignment-questions__view my-3"
                key={question.id}
              >
                <div className="card-body">
                  <div className="assignment-question__view">
                    <span>
                      <strong>Question: </strong>
                    </span>
                    <span>{question.description}</span>
                  </div>
                  <div className="assignment-marks__view">
                    <span>
                      <strong>Marks: </strong>
                    </span>
                    <span>{question.marks}</span>
                  </div>
                  <div className="assignment-marks__view">
                    <span>
                      <strong>Answer: </strong>
                    </span>
                    <span>{question.answer}</span>
                  </div>
                  <div className="assignment-answers__view">
                    <span>
                      <strong>Options </strong>
                    </span>
                    <span>
                      {question.choices.map((choice) => {
                        return (
                          <div className="" key={choice.id}>
                            <span>
                              <strong>{choice.abbreviation}: </strong>
                            </span>
                            <span>{choice.description}</span>
                          </div>
                        );
                      })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
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
    } else {
      return <div />;
    }
  }
}

export default ViewAssignment;
