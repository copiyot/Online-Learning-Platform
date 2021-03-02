import React, { Component } from "react";

class EditCreateQuestion extends Component {
  state = {
    choice: "",
    answers: [],
    optionSize: [],
    answer: "",
    description: "",
    realAns: {},
    realQue: {},
    answerArr: [],
    marks: "",
    totalMarks: 0,
  };

  componentDidMount() {
    const { realQue, realAns } = this.state;

    realQue[this.props.size] = this.props.description;
    realAns[`marks`] = this.props.queMarks;
    realAns["answer"] = this.props.answer;
    realAns["queId"] = this.props.quesId;

    for (let char of this.props.choices) {
      realAns[char.id] = char.description;
    }

    this.setState({
      realQue,
      realAns,
      marks: this.props.queMarks,
      choice: this.props.choice,
    });

    this.addExtraAnswers();
  }

  deleteOptionHandler = (pos) => {
    const { answers, realAns, realQue } = this.state;
    console.log(pos);
    const { size, onRealQuestionChange } = this.props;

    let newArr = answers.filter((ans) => parseInt(ans.key) !== pos);
    delete realAns[pos];

    this.setState({ realAns });
    this.setState({ answers: newArr });
    onRealQuestionChange(realQue, realAns, size);
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

  addExtraAnswers = () => {
    const { choices } = this.props;
    const { realAns, answers, optionSize } = this.state;
    let count;

    choices.forEach((choice) => {
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
  };

  onChoiceChange = (e) => {
    this.setState({ choice: e.target.value });
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onOptionChange = (e) => {
    const { realAns, realQue } = this.state;
    realAns[e.target.name] = e.target.value;
    let key = this.props.size;
    this.setState({ realAns });
    this.props.onRealQuestionChange(realQue, realAns, key);
  };

  onMarksChange = (e) => {
    const { realAns, realQue } = this.state;
    realAns[e.target.name] = parseInt(e.target.value);
    let key = this.props.size;
    this.setState({ realAns });
    this.props.updateMarks(e.target.name, e.target.value);
    this.props.onRealQuestionChange(realQue, realAns, key);
  };

  onCheckBoxChange = (e) => {
    const { realAns, answerArr, realQue } = this.state;
    let key = this.props.size;
    let val;
    if (e.target.checked) {
      val = parseInt(e.target.value);
      answerArr.push(val);
      realAns[e.target.name] = answerArr;
      this.setState({ realAns });
      this.props.onRealQuestionChange(realQue, realAns, key);
    } else if (!e.target.checked) {
      val = parseInt(e.target.value);
      let arr = answerArr.filter((value) => value !== val);
      this.setState({ answerArr: arr });
      realAns[e.target.name] = arr;
      this.setState({ realAns });
      this.props.onRealQuestionChange(realQue, realAns, key);
    }
  };

  onQuestionChange = (e) => {
    const { realAns, realQue } = this.state;
    realQue[e.target.name] = e.target.value;
    this.setState({ realQue });
    let { onRealQuestionChange } = this.props;
    let key = e.target.name;
    onRealQuestionChange(realQue, realAns, key);
  };

  onPasteHandler = (e) => {
    console.log(e.clipboardData.getData("Text"));
  };

  render() {
    let { size, addQuestion, deleteQuestion } = this.props;
    let { choice, answers, realQue, realAns } = this.state;

    return (
      <div
        className="card create-assignment__body mb-3"
        key={"question" + size}
      >
        <div className="card-body create-assignment__questions">
          <div className="row">
            <div className="col-md-9 question pr-4">
              <span className="question-numbers">{`${size}`}.</span>
              <input
                type="text"
                className="assignment-question p-2"
                placeholder="Question"
                name={`${size}`}
                value={realQue[size] || ""}
                onChange={this.onQuestionChange}
                onPaste={this.onPasteHandler}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-control"
                value={choice}
                onChange={this.onChoiceChange}
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
              value={realAns[`marks`] || ""}
              name={`marks`}
              onChange={this.onMarksChange}
            />
          </div>
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
            <div className="answer-options mt-4">
              <div className="directive-marks">
                <div className="teacher-directive mt-2">
                  Check the option that is the answer
                </div>
              </div>
              {answers.map((answer) => {
                return answer;
              })}
              <div className="add-option">
                <button className="add-option__button" onClick={this.addAnswer}>
                  <i className="fa fa-plus mr-2" aria-hidden="true"></i>
                  Add option
                </button>
              </div>
            </div>
          )}
          <hr className="mb-3" />
          <div className="remove-add__buttons">
            <button className="answer-delete" onClick={deleteQuestion}>
              <i className="far fa-trash-alt mr-2"></i>
              Delete Question
            </button>
            <button
              className="add-question__button float-right"
              onClick={addQuestion}
            >
              <i className="fa fa-plus mr-2" aria-hidden="true"></i>
              Add Question
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditCreateQuestion;
