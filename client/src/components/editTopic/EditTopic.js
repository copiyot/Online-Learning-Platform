import React, { Component } from "react";
import { connect } from "react-redux";

import "../createTopic/./CreateTopic.css";
import { editTopic, fetchTopic } from "../../actions";

class EditTopic extends Component {
  state = {
    subjects: [],
    selectedSubject: "",
    topicName: "",
    topicDescription: "",
    objective: "",
    grade: "",
    form: "",
    id: "",
    formErrors: {
      selectedSubject: "",
      topicName: "",
      topicDescription: "",
      objective: "",
      grade: "",
    },
  };

  componentWillMount() {
    this.setState({ subjects: this.props.subjects });
  }

  componentWillReceiveProps(nextProps) {
    const {
      id,
      subject_id,
      name,
      description,
      objective,
      grade,
    } = nextProps.topic;
    this.setState({
      subjects: nextProps.subjects,
      selectedSubject: subject_id,
      topicName: name,
      topicDescription: description,
      objective,
      grade,
      id,
    });
  }

  onChangeHandler = (e) => {
    const { name, value } = e.target;
    const { formErrors } = this.state;

    switch (name) {
      case "selectedSubject":
        formErrors.selectedSubject = value ? "" : "Select a Subject";
        break;

      case "topicName":
        formErrors.topicName = value ? "" : "Topic name is required";
        break;

      case "topicDescription":
        formErrors.topicDescription = value ? "" : "Topic description required";
        break;

      case "objective":
        formErrors.objective = value ? "" : "Topic objective required";
        break;

      case "grade":
        formErrors.grade = value ? "" : "Select a class";
        break;

      default:
        break;
    }

    this.setState({ [name]: value }, () => console.log(this.state));
  };

  onSubjectChangeHandler = (e) => {
    this.setState({ selectedSubject: e.target.value });
  };

  formValid = (formErrors) => {
    let valid = true;

    Object.values(formErrors).forEach((val) => {
      val.length > 0 && (valid = false);
    });

    return valid;
  };

  onSubmitHandler = async () => {
    const {
      selectedSubject,
      topicName,
      topicDescription,
      objective,
      grade,
      formErrors,
      id,
    } = this.state;

    if (this.formValid(formErrors)) {
      let data = {
        id,
        subject_id: selectedSubject,
        name: topicName,
        description: topicDescription,
        objective,
        grade,
        created_by: localStorage.getItem("username"),
      };

      await this.props.editTopic(data);

      this.setState({
        selectedSubject: "",
        topicName: "",
        topicDescription: "",
        objective: "",
        grade: "",
        form: "",
      });

      await this.props.fetchTopic();

      await this.props.handler();
    } else {
      const {
        selectedSubject,
        topicName,
        topicDescription,
        objective,
        grade,
      } = formErrors;

      alert(
        selectedSubject || topicName || topicDescription || objective || grade
      );
    }
  };

  render() {
    const {
      selectedSubject,
      subjects,
      topicName,
      topicDescription,
      objective,
      grade,
    } = this.state;

    return (
      <div
        className="modal fade"
        id="edit-topic"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                EDIT TOPIC
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="inputState">
                  <b>Subject:</b>
                </label>
                <select
                  id="inputState"
                  className="form-control"
                  onChange={this.onChangeHandler}
                  name="selectedSubject"
                  value={selectedSubject || ""}
                >
                  <option key="99999">Select subject..</option>
                  {subjects.map((subject) => (
                    <option value={subject.id} key={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="topic-name">
                  <b>Topic Name:</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="topic-name"
                  placeholder="topic name"
                  name="topicName"
                  value={topicName || ""}
                  onChange={this.onChangeHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="topic-description">
                  <b>Topic Description:</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="topic-description"
                  placeholder="topic description"
                  name="topicDescription"
                  value={topicDescription || ""}
                  onChange={this.onChangeHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="objective">
                  <b>Objective:</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="objective"
                  placeholder="objective"
                  name="objective"
                  value={objective || ""}
                  onChange={this.onChangeHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="grade">
                  <b>Grade:</b>
                </label>
                <select
                  className="custom-select mr-sm-2"
                  id="primary-school"
                  onChange={this.onChangeHandler}
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
              <div className="form-group">
                <label htmlFor="grade">
                  <b>High School:</b>
                </label>
                <select
                  className="custom-select mr-sm-2"
                  id="primary-school"
                  onChange={this.onChangeHandler}
                  name="grade"
                  value={grade || ""}
                >
                  <option defaultValue>Choose Class</option>
                  <option value="9">Form One</option>
                  <option value="10">Form Two</option>
                  <option value="11">Form Three</option>
                  <option value="12">Form Four</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn save-subject"
                onClick={() => this.onSubmitHandler()}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    subjects: state.subject.data,
  };
};

export default connect(mapStateToProps, { editTopic, fetchTopic })(EditTopic);
