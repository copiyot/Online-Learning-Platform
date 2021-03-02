import React, { Component } from "react";
import { connect } from "react-redux";

import "./CreateSchemeOfWork.css";
import { createSchemeOfWork, fetchSchemeOfWork } from "../../actions";

class CreateSchemeOfWork extends Component {
  state = {
    subjects: [],
    selectedSubject: "",
    term: "",
    description: "",
    formErrors: {
      selectedSubject: "Subject is required",
      term: "Term is required",
      description: "Description is required",
    },
  };

  componentWillMount() {
    this.setState({ subjects: this.props.subjects });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ subjects: nextProps.subjects });
  }

  onChangeHandler = (e) => {
    const { name, value } = e.target;
    const { formErrors } = this.state;

    switch (name) {
      case "selectedSubject":
        formErrors.selectedSubject = value ? "" : "Select a Subject";
        break;

      case "term":
        formErrors.term = value ? "" : "Term is required";
        break;

      case "description":
        formErrors.description = value ? "" : "Description is required";
        break;

      default:
        break;
    }

    this.setState({ [name]: value }, () => console.log(this.state));
  };

  formValid = (formErrors) => {
    let valid = true;

    Object.values(formErrors).forEach((val) => {
      val.length > 0 && (valid = false);
    });

    return valid;
  };

  onSubmitHandler = async () => {
    const { selectedSubject, description, term, formErrors } = this.state;

    if (this.formValid(formErrors)) {
      let data = {
        subject_id: selectedSubject,
        term: term,
        description: description,
        created_by: localStorage.getItem("username"),
      };

      this.setState({
        selectedSubject: "",
        term: "",
        description: "",
      });

      await this.props.createSchemeOfWork(data);

      await this.props.fetchSchemeOfWork();

      await this.props.handler();
    } else {
      const { selectedSubject, term, description } = formErrors;

      alert(selectedSubject || term || description);
    }
  };

  render() {
    let { subjects, term, description, selectedSubject } = this.state;

    return (
      <div
        className="modal fade"
        id="create-schemeof__work"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                CREATE SCHEME OF WORK
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
                <label htmlFor="subject-id">
                  <b>Description:</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  placeholder="description"
                  name="description"
                  value={description}
                  onChange={this.onChangeHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="subtopic-name">
                  <b>Term:</b>
                </label>
                <select
                  id="inputState"
                  className="form-control"
                  name="term"
                  onChange={this.onChangeHandler}
                  value={term}
                >
                  <option value="">Choose...</option>
                  <option value="1">Term One</option>
                  <option value="2">Term Two</option>
                  <option value="3">Term Three</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="inputState">
                  <b>Subject:</b>
                </label>
                <select
                  id="inputState"
                  className="form-control"
                  name="selectedSubject"
                  onChange={this.onChangeHandler}
                  value={selectedSubject}
                >
                  <option value="" key="99999">
                    Select subject..
                  </option>
                  {subjects.map((subject) => (
                    <option value={subject.id} key={subject.id}>
                      {subject.name}
                    </option>
                  ))}
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
                className="btn save-schemeof__work"
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

export default connect(mapStateToProps, {
  createSchemeOfWork,
  fetchSchemeOfWork,
})(CreateSchemeOfWork);
