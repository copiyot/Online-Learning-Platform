import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./CreateAssignment.css";

class CreateAssignment extends Component {
  state = { returnDate: new Date(), answers: [], questions: [] };

  returnDateChangeHandler = (returnDate) => {
    this.setState({ returnDate });
  };

  addAnswer = () => {
    let answers = this.state.answers;
    let size = answers.length + 1;
    answers.push(
      <div className="form-check answer-option my-4" key={size}>
        <i className="far fa-circle radio-button__option"></i>
        <input
          type="text"
          className="answer-option__input mr-3"
          placeholder="Option"
        />
        <button className="answer-delete">
          <i className="far fa-trash-alt mr-2"></i>
          Delete Option
        </button>
      </div>
    );

    this.setState({ answers: answers });
  };

  addQuestion = () => {
    let questions = this.state.questions;
    let size = questions.length + 1;

    let { answers } = this.state;

    questions.push(
      <div className="card create-assignment__questions mb-3">
        <div className="card-body mt-2">
          <div className="row">
            <div className="col-md-9 pr-4">
              <input
                type="text"
                className="assignment-question p-2"
                placeholder="Question"
              />
            </div>
            <div className="col-md-3">
              <select className="form-control">
                <option>Multiple choice</option>
                <option>Paragraph</option>
              </select>
            </div>
          </div>
          <div className="answer-options mt-4">
            <div className="form-check answer-option my-4">
              <i className="far fa-circle radio-button__option"></i>
              <input
                type="text"
                className="answer-option__input mr-3"
                placeholder="Option"
              />
            </div>
            {answers.map((answer) => {
              return answer;
            })}
            <div className="add-option">
              <i className="far fa-circle radio-button__option"></i>
              <input
                type="text"
                className="add-option__input"
                placeholder="Add option"
                onClick={this.addAnswer}
              />
            </div>
            <hr mb-2 />
            <div className="remove-add__buttons">
              <button className="answer-delete">
                <i className="far fa-trash-alt mr-2"></i>
                Delete Question
              </button>
              <button
                class="add-question__button float-right"
                onClick={this.addQuestion}
              >
                <i className="fa fa-plus mr-2" aria-hidden="true"></i>
                Add Question
              </button>
            </div>
          </div>
        </div>
      </div>
    );

    this.setState({ questions: questions });
  };

  render() {
    const { returnDate, answers, questions } = this.state;

    return (
      <div className="create-assignment">
        <div className="card create-assignment__header my-4">
          <div className="card-body assignment-header row">
            <div className="assignment-header__titles col-md-6">
              <input
                type="text"
                className="assignment-title my-3"
                placeholder="Assignment Title"
              />
              <textarea
                className="assignment-description"
                placeholder="Assignment description"
                rows="2"
              ></textarea>
            </div>
            <div className="assignment-header__details col-md-6 px-3">
              <input
                type="text"
                className="assignment-grade my-3"
                placeholder="Enter Grade"
              />
              <input
                type="text"
                className="assignment-subject mb-3"
                placeholder="Enter Subject"
              />
              <div className="assignment-return__date mb-2">
                <label
                  className="assignment-return__datelabel mr-2"
                  htmlFor="return-date__picker"
                >
                  <span>Enter the expected return date:</span>
                </label>
                <DatePicker
                  selected={returnDate}
                  id="return-date__picker"
                  className="return-date__picker"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  onChange={this.returnDateChangeHandler}
                />
              </div>
              <button className="save-assignment__button">
                <i className="far fa-save mr-2"></i>
                Save Assignment
              </button>
            </div>
          </div>
        </div>

        <div className="card create-assignment__questions mb-3">
          <div className="card-body mt-2">
            <div className="row">
              <div className="col-md-9 pr-4">
                <input
                  type="text"
                  className="assignment-question p-2"
                  placeholder="Question"
                />
              </div>
              <div className="col-md-3">
                <select className="form-control">
                  <option>Multiple choice</option>
                  <option>Paragraph</option>
                </select>
              </div>
            </div>
            <div className="answer-options mt-4">
              <div className="form-check answer-option my-4">
                <i className="far fa-circle radio-button__option"></i>
                <input
                  type="text"
                  className="answer-option__input mr-3"
                  placeholder="Option"
                />
              </div>
              {answers.map((answer) => {
                return answer;
              })}
              <div className="add-option">
                <i className="far fa-circle radio-button__option"></i>
                <input
                  type="text"
                  className="add-option__input"
                  placeholder="Add option"
                  onClick={this.addAnswer}
                />
              </div>
              <hr mb-2 />
              <div className="remove-add__buttons">
                <button className="answer-delete">
                  <i className="far fa-trash-alt mr-2"></i>
                  Delete Question
                </button>
                <button
                  class="add-question__button float-right"
                  onClick={this.addQuestion}
                >
                  <i className="fa fa-plus mr-2" aria-hidden="true"></i>
                  Add Question
                </button>
              </div>
            </div>
          </div>
        </div>
        {questions.map((question) => {
          return question;
        })}
      </div>
    );
  }
}

export default CreateAssignment;
