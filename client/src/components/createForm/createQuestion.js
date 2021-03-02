import React, { Component } from "react";

class CreateQuestion extends Component {
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

  deleteOptionHandler = (pos) => {
    const { answers, realAns } = this.state;
    console.log(pos);

    let newArr = answers.filter((ans) => parseInt(ans.key) !== pos);
    delete realAns[pos];

    this.setState({ realAns });
    this.setState({ answers: newArr });
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

  onChoiceChange = (e) => {
    this.setState({ choice: e.target.value });
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onOptionChange = (e) => {
    const { realAns } = this.state;
    realAns[e.target.name] = e.target.value;

    this.setState({ realAns });
  };

  onMarksChange = (e) => {
    const { realAns } = this.state;
    realAns[e.target.name] = parseInt(e.target.value);
    this.setState({ realAns });
    this.props.updateMarks(e.target.name, e.target.value);
  };

  onCheckBoxChange = (e) => {
    const { realAns, answerArr } = this.state;
    let val;
    if (e.target.checked) {
      val = parseInt(e.target.value);
      answerArr.push(val);
      realAns[e.target.name] = answerArr;
      this.setState({ realAns });
    } else if (!e.target.checked) {
      val = parseInt(e.target.value);
      let arr = answerArr.filter((value) => value !== val);
      this.setState({ answerArr: arr });
      realAns[e.target.name] = arr;
      this.setState({ realAns });
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
    let { choice, answers } = this.state;
    let anSize = 1;
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
              name={`marks${size}`}
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
              <div className="form-check answer-option my-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="answer"
                  id="gridRadios2"
                  value={`${anSize}`}
                  onChange={this.onCheckBoxChange}
                ></input>
                <input
                  type="text"
                  className="answer-option__input mr-3"
                  placeholder="Option"
                  name={`${anSize}`}
                  onChange={this.onOptionChange}
                />
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

export default CreateQuestion;
