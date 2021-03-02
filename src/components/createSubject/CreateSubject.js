import React, { Component } from "react";
import { connect } from "react-redux";

import "./CreateSubject.css";
import { createSubject, fetchSubjects } from "../../actions";

class CreateSubject extends Component {
  state = {
    code: "",
    name: "",
    description: "",
    formErrors: {
      code: "Subject code is needed",
      name: "Subject name is needed",
      description: "Subject description is needed",
    },
  };

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
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  formValid = (formErrors) => {
    let valid = true;

    Object.values(formErrors).forEach((val) => {
      val.length > 0 && (valid = false);
    });

    return valid;
  };

  onSubmitHandler = async () => {
    const { code, name, description, formErrors } = this.state;

    if (this.formValid(formErrors)) {
      let data = {
        code: code,
        name: name,
        description: description,
        created_by: localStorage.getItem("username"),
      };

      await this.props.createSubject(data);

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
        id="create-subject"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                NEW SUBJECT
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

export default connect(null, { createSubject, fetchSubjects })(CreateSubject);
