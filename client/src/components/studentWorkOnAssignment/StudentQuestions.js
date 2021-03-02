import React from "react";
import axios from "axios";

import "./StudentWorkOnAssignment.css";
import { BASE_URL } from "../api";

class StudentQuestions extends React.Component {
  state = { answers: [] };

  componentWillUpdate() {
    console.log(this.state);
  }

  onCheckBoxChange = (e) => {
    const { answers } = this.state;
    if (e.target.checked) {
      answers.push(e.target.value);
      console.log(this.state.answers);
    } else if (!e.target.checked) {
      let ans = answers.filter((answer) => answer !== e.target.value);
      console.log(ans);
      this.setState({ answers: ans });
    }
  };

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = async () => {
    let questions = [];
    for (let key in this.state) {
      if (key !== "answers") {
        let json = { answer: this.state[key], questionId: key };
        questions.push(json);
      }
    }

    for (let char of this.state.answers) {
      let arr = char.split(":");
      let json = { answer: arr[1], questionId: arr[0] };
      questions.push(json);
    }

    let json = {
      assessmentId: this.props.id,
      studentId: localStorage.getItem("studentId"),
      questions,
    };

    try {
      const response = await axios.post(
        BASE_URL + `secured/assessment/student/submit-question`,
        json
      );

      alert(response.data.message);
    } catch (e) {
      console.log("Error submitting exams" + e);
    }

    console.log(json);
  };

  renderAnswersHelper = (question) => {
    if (question.choices.length > 0) {
      return (
        <div className="student-assignment__options my-2">
          {question.choices.map((choice) => (
            <div className="student-assignment__option ml-3" key={choice.id}>
              <input
                className="form-check-input"
                type="checkbox"
                name="answer"
                value={question.id + ":" + choice.abbreviation}
                onChange={this.onCheckBoxChange}
              />
              {choice.description}
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <textarea
          className="form-control mb-2"
          id="exampleFormControlTextarea1"
          rows="3"
          onChange={this.onChangeHandler}
          name={question.id}
        ></textarea>
      );
    }
  };

  render() {
    const { questions } = this.props;
    console.log(questions);
    let count = 1;
    if (questions === undefined) {
      return <div className="student-loading">...Loading</div>;
    }

    return (
      <div className="student-questions">
        {questions.map((question) => (
          <div
            className="student-assignment__questions card py-2 px-5 my-2"
            key={question.id}
          >
            <div className="student-question__marks mb-2">
              <span className="student-assignment__question">
                <strong>Question {count}: </strong>
                {question.description}
              </span>
              <span className="student-assignment__marks">
                <strong>Marks: </strong>
                {question.marks}
              </span>
            </div>
            <div className="">{this.renderAnswersHelper(question)}</div>
            <div className="count-hidden">{count++}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default StudentQuestions;
