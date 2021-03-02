import React, { Component } from "react";

import "./CreateAssignmentOption.css";
import CreateAssignmentForm from "../createForm/CreateForm";
import CreateAssignmentFile from "../createFile/CreateFile";

class CreateAssignmentOption extends Component {
  state = {
    selected: "assignment-option",
    category: 1,
    title: "Assignment Title",
    description: "Assignment Description",
  };

  onFormButtonClickHandler = () => {
    this.setState({ selected: "assignment-form" });
  };

  onFileButtonClickHandler = () => {
    this.setState({ selected: "assignment-file" });
  };

  changeToInitialState = () => {
    this.setState({ selected: "assignment-option" });
  };

  renderHelper = () => {
    let { selected } = this.state;

    if (selected === "assignment-option") {
      return (
        <div className="row">
          <div className="col-md-6 form-option">
            <button
              type="button"
              className="btn form-option__button"
              onClick={this.onFormButtonClickHandler}
            >
              Create Assignment with a form{" "}
              <i className="fas fa-arrow-right"></i>{" "}
            </button>
            <div className="form-option__details mt-3">
              Use the form option to create an assignment that will be
              automatcally sent to the parents and childs dashboard. This also
              allows for choosing between multiple choices answers and paragraph
              answers.
            </div>
          </div>
          <div className="col-md-6 file-option">
            <button
              type="button"
              className="btn file-option__button"
              onClick={this.onFileButtonClickHandler}
            >
              Upload Assignment <i className="fas fa-arrow-right"></i>
            </button>
            <div className="file-option__details mt-3">
              Use this option to upload an already pre-created assignment into
              the system from your local machine. This assignment will be sent
              to the parents and teachers dashboard automatcally.
            </div>
          </div>
        </div>
      );
    } else if (selected === "assignment-form") {
      return (
        <CreateAssignmentForm
          category={this.state.category}
          handler={this.changeToInitialState}
          title={this.state.title}
          description={this.state.description}
        />
      );
    } else if (selected === "assignment-file") {
      return (
        <CreateAssignmentFile
          category={this.state.category}
          handler={this.changeToInitialState}
          title={this.state.title}
          description={this.state.description}
        />
      );
    }
  };

  render() {
    return (
      <div className="create-assignment__option">{this.renderHelper()}</div>
    );
  }
}

export default CreateAssignmentOption;
