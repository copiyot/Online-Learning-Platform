import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";

import CreateQuestion from "../createForm/createQuestion";
import AddQuestion from "./AddQuestion";
import "../createForm/CreateForm.css";
import { BASE_URL } from "../api";
import axios from "axios";
import EditCreateQuestion from "./EditCreateQuestion";
import { saveAs } from "file-saver";
// import { createAssignmentForm } from "../../actions";

class EditAssignment extends React.Component {
  state = {
    returnDate: new Date(),
    assignmentId: "",
    answers: [],
    optionSize: [],
    ques: [],
    queSize: [],
    choice: "multiple",
    title: "",
    description: "",
    answer: [],
    grade: "",
    subject: "",
    realAns: {},
    realQue: {},
    realQuestions: {},
    questions2: {},
    answerArr: [],
    marks: "",
    selectedFile: null,
    selectedSubjectOption: null,
    subjects: [],
    totalMarks: 0,
    questionMarks: {},
    assignment: [],
    marksEdit: {},
    choiceEdit: {},
    question: {},
    formErrors: {
      returnDate: "",
      title: "",
      description: "",
      grade: "",
      subject: "",
      question: "",
      marks: "",
      option: "",
      answer: "",
    },
  };

  componentDidUpdate = () => console.log("update state", this.state);

  componentWillMount = async () => {
    await this.fetchAssignment();
  };

  fetchAssignment = async () => {
    try {
      const response = await axios.get(
        BASE_URL + "secured/assessment/findAssessmentById/" + this.props.id
      );

      console.log(response.data);

      const {
        realQue,
        marksEdit,
        choiceEdit,
        realAns,
        realQuestions,
      } = this.state;

      let questions = response.data.questions;

      if (questions.length > 0) {
        let data;
        let count_que = 1;

        for (let i in questions) {
          data = {};
          data["description"] = questions[i].description;
          if (questions[i].answer) {
            data["answer"] = questions[i].answer.split(",");
          } else {
            data["answer"] = questions[i].answer;
          }
          data[`marks`] = questions[i].marks;
          data["queId"] = questions[i].id;
          for (let j in questions[i].choices) {
            data[questions[i].choices[j].id] =
              questions[i].choices[j].description;
          }
          realQuestions[count_que] = data;
          count_que++;
        }

        console.log(data);

        let count = 1;

        realQue[count] = response.data.questions[0].description;
        marksEdit[count] = response.data.questions[0].marks;
        choiceEdit[count] =
          response.data.questions[0].choices.length > 0
            ? "multiple"
            : "paragraph";
        realAns["answer"] = response.data.questions[0].answer.split(",");
        realAns[`marks`] = response.data.questions[0].marks;
        realAns["queId"] = response.data.questions[0].id;

        for (let char of response.data.questions[0].choices) {
          realAns[char.id] = char.description;
        }

        this.setState({
          assignment: response.data,
          returnDate: new Date(response.data.dateExpected),
          realQue,
          marksEdit,
          choiceEdit,
          title: response.data.name,
          description: response.data.description,
          grade: response.data.grade,
          selectedSubjectOption: response.data.subjectId,
          question: response.data.questions[0],
          realAns,
          assignmentId: response.data.id,
        });

        this.displayExtraQuestions();
        this.addExtraAnswers();
      } else {
        this.setState({
          assignment: response.data,
          returnDate: new Date(response.data.dateExpected),
          title: response.data.name,
          description: response.data.description,
          grade: response.data.grade,
          selectedSubjectOption: response.data.subjectId,
          id: response.data.id,
        });
      }
    } catch (e) {
      console.log("Error Logged", e);
    }
  };

  displayExtraQuestions = () => {
    const { assignment, ques, queSize } = this.state;
    let quez = assignment.questions;

    if (quez) {
      for (let i = 1; i < quez.length; i++) {
        let description = quez[i].description;
        let marks = quez[i].marks;
        let choice = quez[i].choices.length > 0 ? "multiple" : "paragraph";
        let choices = quez[i].choices;
        let quesId = quez[i].id;

        let answer;
        if (quez[i].answer) {
          answer = quez[i].answer.split(",");
        } else {
          answer = quez[i].answer;
        }

        let que = (
          <EditCreateQuestion
            size={i + 1}
            key={i + 1}
            addQuestion={this.addQuestion}
            onRealQuestionChange={this.onRealQuestionChange}
            onCheckBoxChange={this.onCheckBoxChange}
            deleteQuestion={() => this.deleteQuestionHandler(i + 1)}
            updateMarks={this.updateMarks}
            marks={this.state.totalMarks}
            description={description}
            queMarks={marks}
            choice={choice}
            choices={choices}
            answer={answer}
            quesId={quesId}
          />
        );

        ques.push(que);
        queSize.push(que);

        this.setState({ ques });
        this.setState({ queSize });
      }
    }
  };

  returnDateChangeHandler = (returnDate) => {
    const { formErrors } = this.state;

    formErrors.returnDate = returnDate ? "" : "Return date is required";

    this.setState({ returnDate });
  };

  onOptionChange = (e) => {
    const { realAns, formErrors, realQue } = this.state;
    const { name, value } = e.target;
    formErrors.option = value ? "" : "Option is required";
    realAns[name] = value;
    let key = 1;
    this.setState({ realAns });
    this.onRealQuestionChange(realQue, realAns, key);
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
    const { realAns, answerArr, formErrors, realQue } = this.state;
    let val;
    let key = 1;
    if (e.target.checked) {
      val = parseInt(e.target.value);
      answerArr.push(val);
      realAns[e.target.name] = answerArr;
      this.setState({ realAns });
      this.onRealQuestionChange(realQue, realAns, key);
      formErrors.answer = answerArr.length > 0 ? "" : "Answer is required";
    } else if (!e.target.checked) {
      val = parseInt(e.target.value);
      let arr = answerArr.filter((value) => value !== val);
      this.setState({ answerArr: arr });
      realAns[e.target.name] = arr;
      this.setState({ realAns });
      formErrors.answer = answerArr.length === 1 ? "Answer is required" : "";
      this.onRealQuestionChange(realQue, realAns, key);
    }
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
    let { realQuestions, questions2 } = this.state;
    let queValue = que[key];
    questions2[key] = queValue;
    realQuestions[key] = ans;
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

      case "selectedSubjectOption":
        formErrors.subject = value ? "" : "Subject is required";
        break;

      default:
        break;
    }

    this.setState({ [name]: value });
  };

  deleteOptionHandler = (pos) => {
    const { answers, realAns, realQue } = this.state;
    console.log(pos);

    let newArr = answers.filter((ans) => parseInt(ans.key) !== pos);
    delete realAns[pos];
    let key = 1;

    this.setState({ realAns });
    this.setState({ answers: newArr });
    this.onRealQuestionChange(realQue, realAns, key);
  };

  deleteQuestionHandler = (pos) => {
    const { ques, realQuestions, questionMarks } = this.state;
    console.log(pos);

    let marks = `marks`;
    delete questionMarks[marks];
    this.setState({ questionMarks });
    this.updateSum();

    let newArr = ques.filter((que) => parseInt(que.key) !== pos);
    delete realQuestions[pos];

    this.setState({ realQuestions });
    this.setState({ ques: newArr });
  };

  onSaveAssignment = async () => {
    const { realQuestions, totalMarks, formErrors } = this.state;

    const {
      selectedSubjectOption,
      description,
      grade,
      returnDate,
      title: name,
      assignmentId,
    } = this.state;

    if (this.formValid(formErrors)) {
      let subjectId = selectedSubjectOption;

      let jsonObj = {
        id: assignmentId,
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
        let { answer, description, marks, queId } = question;

        // let arr = Object.values(question);

        let ans;
        let quesId = queId;
        if (answer === undefined || answer === null) {
          ans = null;
        } else {
          ans = answer.join();
        }

        let qObj = {
          answer: ans,
          description,
          marks,
          id: realQuestions[key].queId,
          orden: 1,
          choices: [],
        };

        let count = 1;

        for (let key2 in question) {
          let intKey = parseInt(key2);
          if (intKey) {
            qObj.choices.push({
              id: key2,
              abbreviation: count,
              description: question[key2],
              questionId: quesId,
            });
            count++;
          }
        }

        jsonObj.questions.push(qObj);
      }

      console.log(JSON.stringify(jsonObj));

      const response = await axios.post(
        BASE_URL + "secured/assessment/editAssessment",
        jsonObj,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      alert(response.data.message);
      console.log(response.data);
    } else {
      const { title, description, returnDate, grade, subject } = formErrors;

      alert(title || description || grade || subject || returnDate);
    }
  };

  addExtraAnswers = () => {
    const { realAns, question, answers, optionSize } = this.state;
    let count;

    if (question) {
      question.choices.forEach((choice) => {
        count = optionSize.length + 1;
        let ans = (
          <div className="form-check answer-option my-4" key={choice.id}>
            <input
              className="form-check-input"
              type="checkbox"
              name="answer"
              id="gridRadios2"
              value={`${count}`}
              onChange={this.onCheckBoxChange}
            ></input>
            <input
              type="text"
              className="answer-option__input mr-3"
              placeholder="Option"
              name={`${choice.id}`}
              onChange={this.onOptionChange}
              defaultValue={realAns[choice.id]}
            />
            <button
              className="answer-delete"
              onClick={() => this.deleteOptionHandler(choice.id)}
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
      });
    }
  };

  addAnswer = () => {
    let { answers, optionSize } = this.state;
    let size = optionSize.length + 1;

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
    let { ques, queSize } = this.state;
    let size = queSize.length + 2;

    let question = (
      <AddQuestion
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

    ques.push(question);
    queSize.push(question);

    this.setState({ ques });
    this.setState({ queSize });
  };

  onChoiceChange = (e) => {
    const { choiceEdit } = this.state;
    const { name, value } = e.target;

    choiceEdit[name] = value;

    this.setState({ choiceEdit });
  };

  formValid = (formErrors) => {
    let valid = true;

    Object.values(formErrors).forEach((val) => {
      val.length > 0 && (valid = false);
    });

    return valid;
  };

  onFileChangeHandler = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
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

  onFileUpload = async () => {
    const formData = new FormData();

    formData.append(
      "fileContent",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    formData.append("grade", this.state.grade);

    formData.append("description", this.state.description);

    formData.append("subjectId", this.state.selectedSubjectOption.value);

    formData.append("name", this.state.title);

    formData.append("dateExpected", this.state.returnDate);

    formData.append("username", localStorage.getItem("username"));

    formData.append("category", this.props.category);

    this.props.createAssignmentFile(formData);
  };

  render() {
    const {
      returnDate,
      assignment,
      realQue,
      title,
      description,
      grade,
      selectedSubjectOption,
      marksEdit,
      choiceEdit,
      question,
      answers,
      ques,
    } = this.state;

    console.log(question);
    let size = 1;

    if (assignment) {
      if (!assignment.filePath) {
        return (
          <div>
            <div className="create-assignment__form mt-5">
              <div className="card my-3">
                <div className="card-body assignment-header create-assignment__header row">
                  <div className="assignment-header__titles col-md-6">
                    <input
                      type="text"
                      className="assignment-title my-3"
                      placeholder="Assignment Title"
                      name="title"
                      onChange={this.onHeaderChangeHandler}
                      value={title || ""}
                    />
                    <textarea
                      className="assignment-description"
                      placeholder="Assignment description"
                      rows="2"
                      name="description"
                      onChange={this.onHeaderChangeHandler}
                      value={description || ""}
                    ></textarea>
                  </div>
                  <div className="assignment-header__details col-md-6 px-3">
                    <div className="row my-2">
                      <div className="col-md-6">
                        <label
                          className="primary-select"
                          htmlFor="primary-school"
                        >
                          Primary School
                        </label>
                        <select
                          className="custom-select mr-sm-2"
                          id="primary-school"
                          onChange={this.onHeaderChangeHandler}
                          name="grade"
                          value={grade || ""}
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
                          value={grade || ""}
                        >
                          <option defaultValue>Choose Level</option>
                          <option value="9">Form One</option>
                          <option value="10">Form Two</option>
                          <option value="11">Form Three</option>
                          <option value="12">Form Four</option>
                        </select>
                      </div>
                    </div>
                    <div className="assignment-subject">
                      <select
                        className="custom-select assignment-subject my-3"
                        onChange={this.onHeaderChangeHandler}
                        name="selectedSubjectOption"
                        value={selectedSubjectOption || ""}
                      >
                        <option defaultValue>Enter Subject</option>
                        {this.props.subjects.map((subject) => (
                          <option value={subject.id} key={subject.id}>
                            {subject.name}
                          </option>
                        ))}
                      </select>
                    </div>
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
                        value={realQue[size] || ""}
                      />
                    </div>
                    <div className="col-md-3">
                      <select
                        onChange={this.onChoiceChange}
                        className="form-control"
                        name={size}
                        value={choiceEdit[size] || ""}
                      >
                        <option value="multiple">Multiple choice</option>
                        <option value="paragraph">Paragraph</option>
                      </select>
                    </div>
                  </div>
                  <div className="input-total__marks">
                    <input
                      className="marks-input p-2 ml-4 mt-3 mr-5"
                      type="text"
                      placeholder="Input Marks"
                      name={`marks`}
                      onChange={this.onMarksChange}
                      value={marksEdit[size] || ""}
                    />
                  </div>

                  {choiceEdit[size] === "multiple" ? (
                    <div>
                      <div className="answer-options mt-4">
                        <div className="directive-marks">
                          <div className="teacher-directive mt-2">
                            Check the option that is the answer
                          </div>
                        </div>
                        {answers.map((answer) => answer)}
                        <div className="add-option">
                          <button
                            className="add-option__button"
                            onClick={this.addAnswer}
                          >
                            <i
                              className="fa fa-plus mr-2"
                              aria-hidden="true"
                            ></i>
                            Add option
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="paragraph-input my-4">
                      <input
                        type="text"
                        className="paragraph-option__input py-3"
                        placeholder="Long answer text"
                        disabled="disabled"
                      />
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

            {ques.map((que) => {
              return que;
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
                onClick={() => {
                  this.onSaveAssignment();
                  this.props.handler();
                }}
              >
                <i className="far fa-save mr-2"></i>
                Save Assignment
              </button>
            </div>
          </div>
        );
      } else if (assignment.filePath) {
        return (
          <div className="mt-5">
            <div className="card my-3">
              <div className="card-body assignment-header create-assignment__header row">
                <div className="assignment-header__titles col-md-6">
                  <input
                    type="text"
                    className="assignment-title my-3"
                    placeholder="Assignment Title"
                    name="title"
                    onChange={this.onHeaderChangeHandler}
                    value={title || ""}
                  />
                  <textarea
                    className="assignment-description"
                    placeholder="Assignment description"
                    rows="2"
                    name="description"
                    onChange={this.onHeaderChangeHandler}
                    value={description || ""}
                  ></textarea>
                </div>
                <div className="assignment-header__details col-md-6 px-3">
                  <div className="row my-2">
                    <div className="col-md-6">
                      <label
                        className="primary-select"
                        htmlFor="primary-school"
                      >
                        Primary School
                      </label>
                      <select
                        className="custom-select mr-sm-2"
                        id="primary-school"
                        onChange={this.onHeaderChangeHandler}
                        name="grade"
                        value={grade || ""}
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
                        value={grade || ""}
                      >
                        <option defaultValue>Choose Level</option>
                        <option value="9">Form One</option>
                        <option value="10">Form Two</option>
                        <option value="11">Form Three</option>
                        <option value="12">Form Four</option>
                      </select>
                    </div>
                  </div>
                  <div className="assignment-subject">
                    <select
                      className="custom-select assignment-subject my-3"
                      onChange={this.onHeaderChangeHandler}
                      name="selectedSubjectOption"
                      value={selectedSubjectOption || ""}
                    >
                      <option defaultValue>Enter Subject</option>
                      {this.props.subjects.map((subject) => (
                        <option value={subject.id} key={subject.id}>
                          {subject.name}
                        </option>
                      ))}
                    </select>
                  </div>
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
                  <div className="assignment-filePath__view">
                    <span className="mr-2">
                      <strong> File:</strong>
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
                  <form className="mt-2">
                    <div className="form-group">
                      <label htmlFor="assignment-file__form">
                        {" "}
                        <span className="upload-file__label">
                          Upload Assignment:
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
                </div>
              </div>
            </div>

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
                onClick={() => {
                  this.onFileUpload();
                  this.props.handler();
                }}
              >
                <i className="far fa-save mr-2"></i>
                Save Assignment
              </button>
            </div>
          </div>
        );
      } else {
        return <div className="spinner">...Loading</div>;
      }
    } else {
      return <div className="spinner">...Loading</div>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    subjects: state.subject.data,
  };
};

export default connect(mapStateToProps)(EditAssignment);
