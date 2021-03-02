import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { connect } from "react-redux";

import CreateQuestion from "./createQuestion";
import "./CreateForm.css";
import { BASE_URL } from "../api";
import axios from "axios";
import { createAssignmentForm } from "../../actions";

class CreateForm extends Component {
  state = {
    returnDate: new Date(),
    answers: [],
    optionSize: [],
    questions: [],
    queSize: [],
    choice: "multiple",
    title: "",
    description: "",
    grade: "",
    subject: "",
    realAns: {},
    realQue: {},
    realQuestions: {},
    questions2: {},
    answerArr: [],
    marks: "",
    selectedSubjectOption: null,
    subjects: [],
    totalMarks: 0,
    questionMarks: {},
    formErrors: {
      returnDate: "Return date is required",
      title: "Title is required",
      description: "Description is required",
      grade: "Grade or High School level is required",
      subject: "Subject is required",
      question: "Question is required",
      marks: "Marks is required",
      option: "Option is required",
      answer: "Answer is required",
    },
  };

  componentDidUpdate = () => console.log("update state", this.state);

  componentWillMount = () => this.fetchSubjects();

  returnDateChangeHandler = (returnDate) => {
    const { formErrors } = this.state;

    formErrors.returnDate = returnDate ? "" : "Return date is required";

    this.setState({ returnDate });
  };

  onOptionChange = (e) => {
    const { realAns, formErrors } = this.state;
    const { name, value } = e.target;
    formErrors.option = value ? "" : "Option is required";
    realAns[name] = value;
    this.setState({ realAns });
  };

  onMarksChange = (e) => {
    const { realAns, formErrors } = this.state;
    const { name, value } = e.target;
    formErrors.marks = value ? "" : "Marks is required";
    realAns[name] = parseInt(value);
    this.setState({ realAns });

    this.updateMarks(name, value);
  };

  updateMarks = (name, value) => {
    const { questionMarks } = this.state;
    questionMarks[name] = value;
    this.setState({ questionMarks });
    this.updateSum();
  };

  updateSum = () => {
    const { questionMarks } = this.state;
    let sum = 0;
    for (let val in questionMarks) {
      sum += parseInt(questionMarks[val]);
    }
    this.setState({ totalMarks: sum });
  };

  onCheckBoxChange = (e) => {
    const { realAns, answerArr, formErrors } = this.state;
    let val;
    if (e.target.checked) {
      val = parseInt(e.target.value);
      answerArr.push(val);
      realAns[e.target.name] = answerArr;
      this.setState({ realAns });
      formErrors.answer = answerArr.length > 0 ? "" : "Answer is required";
    } else if (!e.target.checked) {
      val = parseInt(e.target.value);
      let arr = answerArr.filter((value) => value !== val);
      this.setState({ answerArr: arr });
      realAns[e.target.name] = arr;
      this.setState({ realAns });
      formErrors.answer = answerArr.length === 1 ? "Answer is required" : "";
    }
  };

  subjectOptionsChangeHandler = (selectedSubjectOption) => {
    const { formErrors } = this.state;

    formErrors.subject = selectedSubjectOption ? "" : "Subject is required";

    this.setState({ selectedSubjectOption });
  };

  renderSubjects = () => {
    let subjects = this.state.subjects.map((subject) => ({
      value: subject.id,
      label: subject.name,
    }));
    return subjects;
  };

  fetchSubjects = async () => {
    try {
      let response = await axios.get(BASE_URL + "curriculum/subject/list");
      this.setState({ subjects: response.data });
    } catch (e) {
      console.log("Failed to fetch scheme" + e);
    }
  };

  onQuestionChange = (e) => {
    const { realQue, realAns, formErrors } = this.state;
    const { name, value } = e.target;
    formErrors.question = value ? "" : "Question is required";
    realQue[name] = value;
    this.setState({ realQue });
    let key = e.target.name;
    this.onRealQuestionChange(realQue, realAns, key);
  };

  onRealQuestionChange = (que, ans, key) => {
    let { realQuestions, realQue, questions2, answer } = this.state;
    this.setState({ realQue: que });
    let queValue = realQue[key];
    questions2[key] = queValue;
    console.log(key);
    realQuestions[key] = ans;
    realQuestions[key].answer = answer;
    realQuestions[key].description = questions2[key];
    this.setState({ realQuestions });
    console.log(questions2);
  };

  onHeaderChangeHandler = (e) => {
    const { name, value } = e.target;
    const { formErrors } = this.state;

    switch (name) {
      case "title":
        formErrors.title = value ? "" : "Title is required";
        break;

      case "description":
        formErrors.description = value ? "" : "Description is required";
        break;

      case "grade":
        formErrors.grade = value
          ? ""
          : "Grade or High School level is required";
        break;

      default:
        break;
    }

    this.setState({ [name]: value });
  };

  deleteOptionHandler = (pos) => {
    const { answers, realAns } = this.state;
    console.log(pos);

    let newArr = answers.filter((ans) => parseInt(ans.key) !== pos);
    delete realAns[pos];

    this.setState({ realAns });
    this.setState({ answers: newArr });
  };

  deleteQuestionHandler = (pos) => {
    const { questions, realQuestions, questionMarks } = this.state;
    console.log(pos);

    let marks = `marks${pos}`;
    delete questionMarks[marks];
    this.setState({ questionMarks });
    this.updateSum();

    let newArr = questions.filter((que) => parseInt(que.key) !== pos);
    delete realQuestions[pos];

    this.setState({ realQuestions });
    this.setState({ questions: newArr });
  };

  onSaveAssignment = async () => {
    const { realQuestions, totalMarks, formErrors } = this.state;

    const {
      selectedSubjectOption,
      description,
      grade,
      returnDate,
      title: name,
    } = this.state;

    if (this.formValid(formErrors)) {
      let subjectId = selectedSubjectOption.value;

      let jsonObj = {
        name,
        description,
        grade,
        subjectId,
        username: localStorage.getItem("username"),
        dateExpected: returnDate,
        category: this.props.category,
        totalMarks,
        questions: [],
      };

      for (let key in realQuestions) {
        let question = realQuestions[key];
        let { answer, description } = question;

        let arr = Object.values(question);
        let marks = arr[arr.length - 1];

        let ans;
        if (answer === undefined) {
          ans = null;
        } else {
          ans = answer.join();
        }

        let qObj = {
          answer: ans,
          description,
          marks,
          orden: 1,
          file: "",
          choices: [],
        };

        for (let key2 in question) {
          let intKey = parseInt(key2);
          console.log(intKey);
          if (intKey) {
            qObj.choices.push({
              abbreviation: key2,
              description: question[key2],
            });
          }
        }

        jsonObj.questions.push(qObj);
      }
      console.log(JSON.stringify(jsonObj));

      this.props.createAssignmentForm(jsonObj);
    } else {
      const { title, description, returnDate, grade, subject } = formErrors;

      alert(title || description || grade || subject || returnDate);
    }
  };

  addAnswer = () => {
    let { answers, optionSize } = this.state;
    let size = optionSize.length + 2;

    let ans = (
      <div className="form-check answer-option my-4" key={size}>
        <input
          className="form-check-input"
          type="checkbox"
          name="answer"
          id="gridRadios2"
          value={`${size}`}
          onChange={this.onCheckBoxChange}
        ></input>
        <input
          type="text"
          className="answer-option__input mr-3"
          placeholder="Option"
          name={`${size}`}
          onChange={this.onOptionChange}
        />
        <button
          className="answer-delete"
          onClick={() => this.deleteOptionHandler(size)}
        >
          <i className="far fa-trash-alt mr-2"></i>
          Delete Option
        </button>
      </div>
    );
    answers.push(ans);
    optionSize.push(ans);
    this.setState({ answers: answers });
    this.setState({ optionSize: optionSize });
  };

  addQuestion = () => {
    let { questions, queSize } = this.state;
    let size = queSize.length + 2;

    let question = (
      <CreateQuestion
        size={size}
        key={size}
        addQuestion={this.addQuestion}
        onRealQuestionChange={this.onRealQuestionChange}
        onCheckBoxChange={this.onCheckBoxChange}
        deleteQuestion={() => this.deleteQuestionHandler(size)}
        updateMarks={this.updateMarks}
        marks={this.state.totalMarks}
      />
    );

    questions.push(question);
    queSize.push(question);

    this.setState({ questions: questions });
    this.setState({ queSize: queSize });
  };

  onChoiceChange = (e) => {
    this.setState({ choice: e.target.value });
  };

  formValid = (formErrors) => {
    let valid = true;

    Object.values(formErrors).forEach((val) => {
      val.length > 0 && (valid = false);
    });

    return valid;
  };

  render() {
    const {
      returnDate,
      answers,
      questions,
      questionObjects,
      choice,
    } = this.state;

    console.log("child objects" + JSON.stringify(questionObjects));
    let size = 1;

    const options = this.renderSubjects();

    return (
      <div>
        <div className="create-assignment__form mt-5">
          <div className="card my-3">
            <div className="card-body assignment-header create-assignment__header row">
              <div className="assignment-header__titles col-md-6">
                <input
                  type="text"
                  className="assignment-title my-3"
                  placeholder={this.props.title}
                  name="title"
                  onChange={this.onHeaderChangeHandler}
                />
                <textarea
                  className="assignment-description"
                  placeholder={this.props.description}
                  rows="2"
                  name="description"
                  onChange={this.onHeaderChangeHandler}
                ></textarea>
              </div>
              <div className="assignment-header__details col-md-6 px-3">
                <div className="row my-2">
                  <div className="col-md-6">
                    <label className="primary-select" htmlFor="primary-school">
                      Primary School
                    </label>
                    <select
                      className="custom-select mr-sm-2"
                      id="primary-school"
                      onChange={this.onHeaderChangeHandler}
                      name="grade"
                    >
                      <option defaultValue>Choose Grade</option>
                      <option value="1">Grade One</option>
                      <option value="2">Grade Two</option>
                      <option value="3">Grade Three</option>
                      <option value="4">Grade Four</option>
                      <option value="5">Grade Five</option>
                      <option value="6">Grade Six</option>
                      <option value="7">Grade Seven</option>
                      <option value="8">Grade Eight</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="primary-select" htmlFor="high-school">
                      High School
                    </label>
                    <select
                      className="custom-select mr-sm-2"
                      id="high-school"
                      onChange={this.onHeaderChangeHandler}
                      name="grade"
                    >
                      <option defaultValue>Choose Level</option>
                      <option value="9">Form One</option>
                      <option value="10">Form Two</option>
                      <option value="11">Form Three</option>
                      <option value="12">Form Four</option>
                    </select>
                  </div>
                </div>
                <Select
                  type="text"
                  className="assignment-subject my-3"
                  placeholder="Enter Subject"
                  name="subject"
                  onChange={this.subjectOptionsChangeHandler}
                  options={options}
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
                <span className="">
                  {" "}
                  <strong className="mr-2">Total Marks:</strong>
                  {this.state.totalMarks}{" "}
                </span>
              </div>
            </div>
          </div>

          <div className="card create-assignment__body mb-3">
            <div className="card-body create-assignment__questions">
              <div className="row">
                <div className="col-md-9 question pr-4">
                  <span className="question-numbers">{`${size}`}.</span>
                  <input
                    type="text"
                    className="assignment-question p-2"
                    placeholder="Question"
                    name={`${size}`}
                    onChange={this.onQuestionChange}
                  />
                </div>
                <div className="col-md-3">
                  <select
                    onChange={this.onChoiceChange}
                    className="form-control"
                  >
                    <option value="multiple">Multiple choice</option>
                    <option value="paragraph">Paragraph</option>
                  </select>
                </div>
              </div>
              <small className="form-error__message">
                <span className="">{this.state.formErrors.question}</span>
              </small>
              <div className="input-total__marks">
                <input
                  className="marks-input p-2 ml-4 mt-3 mr-5"
                  type="text"
                  placeholder="Input Marks"
                  name={`marks${size}`}
                  onChange={this.onMarksChange}
                />
              </div>
              <small>
                <span className="form-error__message">
                  {this.state.formErrors.marks}
                </span>
              </small>

              {choice === "paragraph" ? (
                <div className="paragraph-input my-4">
                  <input
                    type="text"
                    className="paragraph-option__input py-3"
                    placeholder="Long answer text"
                    disabled="disabled"
                  />
                </div>
              ) : (
                <div>
                  <div className="answer-options mt-4">
                    <div className="directive-marks">
                      <div className="teacher-directive mt-2">
                        Check the option that is the answer
                      </div>
                    </div>
                    <small>
                      <span className="form-error__message">
                        {this.state.formErrors.answer}
                      </span>
                    </small>
                    <div className="form-check answer-option mt-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="answer"
                        id="gridRadios2"
                        value={`${size}`}
                        onChange={this.onCheckBoxChange}
                      ></input>
                      <input
                        type="text"
                        className="answer-option__input mr-3"
                        placeholder="Option"
                        name={`${size}`}
                        onChange={this.onOptionChange}
                      />
                    </div>
                    <small>
                      <span className="form-error__message">
                        {this.state.formErrors.option}
                      </span>
                    </small>
                    {answers.map((answer) => {
                      return answer;
                    })}
                    <div className="add-option">
                      <button
                        className="add-option__button"
                        onClick={this.addAnswer}
                      >
                        <i className="fa fa-plus mr-2" aria-hidden="true"></i>
                        Add option
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <hr className="mb-3" />
              <div className="remove-add__buttons">
                <button
                  className="add-question__button float-right"
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
            onClick={this.onSaveAssignment}
          >
            <i className="far fa-save mr-2"></i>
            Save Assignment
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, { createAssignmentForm })(CreateForm);
