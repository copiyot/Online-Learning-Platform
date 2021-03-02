import React from "react";
import axios from "axios";
import { saveAs } from "file-saver";

import "./MarkAssigment.css";
import { BASE_URL } from "../api";

class Assignment extends React.Component {
  state = {
    questions: [],
    marks: {},
    assignment: [],
    totalMarks: "",
    selectedFile: null,
  };

  componentWillMount() {
    this.setState({
      questions: this.props.questions,
      assignment: this.props.assignment,
    });
    console.log(this.props.assignment);
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  onChangeHandler = (e) => {
    const { marks } = this.state;
    marks[e.target.name] = e.target.value;
    this.setState({ marks });
  };

  optionsRenderHelper = (question) => {
    const options = question.choices.map((choice) => (
      <div className="form-check disabled" key={choice.id}>
        <input
          className="form-check-input"
          type="radio"
          name={choice.abbreviation}
          id="exampleRadios3"
          value="option3"
          disabled
        />
        <label className="form-check-label" htmlFor={choice.abbreviation}>
          {choice.description}
        </label>
      </div>
    ));

    return options;
  };

  answerRenderHelper = (question) => {
    if (question.choices.length > 0) {
      let studentAnswer = question.choices.filter(
        (choice) => choice.abbreviation === question.studentAnser
      );

      const { description } = studentAnswer[0];
      return description;
    } else {
      return question.studentAnser;
    }
  };

  studentScoreRenderHelper = (question, id) => {
    if (question.choices.length > 0) {
      return (
        <span className="mark-student__score">
          Student Score: <strong>{question.studentScore}</strong>
        </span>
      );
    } else {
      return (
        <input
          type="text"
          className="mark-marks__input"
          placeholder="Student Score"
          name={`${id}`}
          onChange={this.onChangeHandler}
        />
      );
    }
  };

  onFileMarksChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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

  onFileChangeHandler = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  onFileSubmitHandler = async () => {
    const { studentId, assessmentId } = this.props;
    const { totalMarks } = this.state;

    const formData = new FormData();

    formData.append("file", this.state.selectedFile);

    formData.append("studentId", studentId);

    formData.append("assessmentId", assessmentId);

    formData.append("totalScore", totalMarks);

    try {
      const response = await axios.post(
        BASE_URL + "secured/assessment/teacher/mark/attached-assessment",
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

  renderHelper = () => {
    const { questions, assignment } = this.state;
    console.log(assignment);
    if (!questions) {
      return (
        <div className="card mark-question__answer p-3 mb-3">
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
              <div className="student-score">
                <span>
                  {" "}
                  <strong>Student Score:</strong>{" "}
                </span>
                <input
                  type="text"
                  className="mark-marks__input"
                  placeholder="Student Score"
                  name="totalMarks"
                  onChange={this.onFileMarksChange}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    let count = 1;
    const questionsCards = questions.map((question) => (
      <div className="card mark-question__answer p-3 mb-3" key={question.id}>
        <div className="mark-question__marks">
          <span className="mark-question">
            {`${count}. `}
            {question.description}
          </span>
          <span className="mark-question__marks">
            Marks: {question.questionScore}
          </span>
          {this.studentScoreRenderHelper(question, question.id)}
        </div>
        <div className="mark-student__answer">
          {" "}
          <div className="mr-2">Students answer is:</div>{" "}
          <div>
            {" "}
            <strong>{this.answerRenderHelper(question)}</strong>
          </div>{" "}
        </div>
        <div className="mark-question__options">
          {this.optionsRenderHelper(question)}
        </div>
        <span className="count-no__display">{count++}</span>
      </div>
    ));

    return questionsCards;
  };

  onSubmitHandler = async () => {
    const { marks } = this.state;
    const { studentId, assessmentId } = this.props;
    // let sum = 0;

    // for (let val in marks) {
    //   sum += parseInt(marks[val]);
    // }
    // console.log(sum);

    let json = { assessmentId, studentId, questions: [] };

    for (let value in marks) {
      let data = { questionId: value, score: marks[value] };
      json.questions.push(data);
    }

    try {
      const response = await axios.post(
        BASE_URL + `secured/assessment/teacher/mark-question`,
        json,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      console.log(response);
      alert(response.data.message);
    } catch (e) {
      console.log("can not save the assignment", e);
    }

    console.log(json);
  };

  render() {
    const { questions } = this.state;

    return (
      <div className="mark-assignment__questions">
        {this.renderHelper()}
        <div className="back-save__buttons">
          <button
            type="button"
            className="btn back-button"
            onClick={this.props.handler}
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back
          </button>
          <button
            type="button"
            className="btn save-button"
            onClick={
              questions
                ? () => this.onSubmitHandler()
                : () => this.onFileSubmitHandler()
            }
          >
            <i className="far fa-save mr-2"></i>
            Save Assignment
          </button>
        </div>
      </div>
    );
  }
}

export default Assignment;
