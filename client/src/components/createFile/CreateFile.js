import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { connect } from "react-redux";

import { createAssignmentFile } from "../../actions";

import "./CreateFile.css";

class CreateFile extends Component {
  state = {
    returnDate: new Date(),
    selectedFile: null,
    title: "",
    description: "",
    grade: "",
    selectedSubjectOption: null,
    subjects: [],
    formErrors: {
      selectedFile: "File is required",
      title: "Title is required",
      description: "Description is required",
      grade: "Grade is required",
      selectedSubjectOption: "Subject is required",
    },
  };

  componentDidUpdate() {
    console.log(this.state);
  }

  componentWillMount = () => {
    this.setState({ subjects: this.props.subjects });
  };

  returnDateChangeHandler = (returnDate) => {
    if (new Date(returnDate) < new Date()) {
      alert("Past Date is not allowed");
    }

    this.setState({ returnDate });
  };

  onChangeHandler = (e) => {
    const { name, value } = e.target;
    const { formErrors } = this.state;

    switch (name) {
      case "grade":
        formErrors.grade = value ? "" : "Grade is required";
        break;

      case "title":
        formErrors.title = value ? "" : "Title is required";
        break;

      case "description":
        formErrors.description = value ? "" : "Description is required";
        break;

      default:
        break;
    }

    this.setState({ [name]: value });
  };

  onFileChangeHandler = (e) => {
    const { formErrors } = this.state;
    formErrors.selectedFile = e.target.files[0] ? "" : "Grade is required";

    this.setState({ selectedFile: e.target.files[0] });
  };

  subjectOptionsChangeHandler = (selectedSubjectOption) => {
    const { formErrors } = this.state;
    formErrors.selectedSubjectOption = selectedSubjectOption
      ? ""
      : "Subject is required";

    this.setState({ selectedSubjectOption });
  };

  renderSubjects = () => {
    let subjects = this.state.subjects.map((subject) => ({
      value: subject.id,
      label: subject.name,
    }));
    return subjects;
  };

  formValid = (formErrors) => {
    let valid = true;

    Object.values(formErrors).forEach((val) => {
      val.length > 0 && (valid = false);
    });

    return valid;
  };

  onFileUpload = async () => {
    const { formErrors } = this.state;

    if (this.formValid(formErrors)) {
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

      this.setState({
        returnDate: new Date(),
        selectedFile: null,
        title: "",
        description: "",
        grade: "",
        selectedSubjectOption: null,
      });
    } else {
      const {
        selectedFile,
        title,
        description,
        grade,
        selectedSubjectOption,
      } = formErrors;

      alert(
        title || description || grade || selectedSubjectOption || selectedFile
      );
    }
  };

  render() {
    let {
      returnDate,
      grade,
      title,
      description,
      selectedSubjectOption,
      selectedFile,
    } = this.state;

    const options = this.renderSubjects();

    return (
      <div className="create-assignment__file">
        <div className="card my-4">
          <div className="card-body create-assignment__header assignment-header row">
            <div className="assignment-header__titles col-md-6">
              <input
                type="text"
                className="assignment-title my-3"
                placeholder={this.props.title}
                name="title"
                value={title || ""}
                onChange={this.onChangeHandler}
              />
              <textarea
                className="assignment-description__file"
                placeholder={this.props.description}
                rows="2"
                name="description"
                value={description || ""}
                onChange={this.onChangeHandler}
              ></textarea>
              <button
                type="button"
                className="btn back-button"
                onClick={this.props.handler}
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Back
              </button>
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

                <div className="col-md-6">
                  <label className="primary-select" htmlFor="high-school">
                    High School
                  </label>
                  <select
                    className="custom-select mr-sm-2"
                    id="high-school"
                    onChange={this.onChangeHandler}
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
              <Select
                type="text"
                className="assignment-subject mb-3"
                placeholder="Enter Subject"
                name="subject"
                onChange={this.subjectOptionsChangeHandler}
                options={options}
                value={selectedSubjectOption || ""}
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
              <button
                className="save-assignment__button"
                onClick={this.onFileUpload}
              >
                <i className="far fa-save mr-2"></i>
                Save Assignment
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
    subjects: state.subject.selectedSubjects,
  };
};

export default connect(mapStateToProps, { createAssignmentFile })(CreateFile);
