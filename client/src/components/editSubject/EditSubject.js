import React, { Component } from "react";
import { connect } from "react-redux";

import "../createSubject/CreateSubject.css";
import { editSubject, fetchSubjects } from "../../actions";

class EditSubject extends Component {
  state = {
    id: "",
    code: "",
    name: "",
    description: "",
    formErrors: {
      code: "",
      name: "",
      description: "",
    },
  };

  componentWillReceiveProps(nextProps) {
    const { id, name, description, code } = nextProps.subject;
    this.setState({
      id: id,
      code: code,
      name: name,
      description: description,
    });
  }

  onchangeHandler = (e) => {
    const { name, value } = e.target;
    let { formErrors } = this.state;

    switch (name) {
      case "code":
        formErrors.code = value ? "" : "Subject code is needed";
        break;

      case "name":
        formErrors.name = value ? "" : "Subject name is needed";
        break;

      case "description":
        formErrors.description = value ? "" : "Subject description is needed";
        break;

      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  };

  formValid = (formErrors) => {
    let valid = true;

    Object.values(formErrors).forEach((val) => {
      val.length > 0 && (valid = false);
    });

    return valid;
  };

  onSubmitHandler = async () => {
    const { id, code, name, description, formErrors } = this.state;
    if (this.formValid(formErrors)) {
      let data = {
        id: id,
        code: code,
        name: name,
        description: description,
        created_by: localStorage.getItem("username"),
      };
      await this.props.editSubject(data);
      this.setState({ code: "", name: "", description: "" });
      await this.props.fetchSubjects();
      await this.props.handler();
    } else {
      const { code, name, description } = formErrors;
      alert(code || name || description);
    }
  };

  render() {
    const { code, name, description } = this.state;

    return (
      <div
        className="modal fade"
        id="edit-subject"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                EDIT SUBJECT
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
                <label htmlFor="InputCode">
                  <b>Code:</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="InputCode"
                  placeholder="code"
                  name="code"
                  value={code}
                  onChange={this.onchangeHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="InputName">
                  <b>Name:</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="InputName"
                  placeholder="name"
                  name="name"
                  value={name}
                  onChange={this.onchangeHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="InputDescription">
                  <b>Description:</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="InputDescription"
                  placeholder="description"
                  name="description"
                  value={description}
                  onChange={this.onchangeHandler}
                />
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
                data-dismiss="modal"
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

export default connect(null, { editSubject, fetchSubjects })(EditSubject);
