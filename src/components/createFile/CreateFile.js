import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { connect } from "react-redux";

import axios from "axios";
import { BASE_URL } from "../api";
import { createAssignmentFile } from "../../actions";

import "./CreateFile.css";

class CreateFile extends Component {
  state = {
    returnDate: new Date(),
    selectedFile: null,
    title: "",
    description: "",
    grade: "",
    subject: "",
    selectedSubjectOption: null,
    subjects: [],
  };

  componentDidUpdate() {
    console.log(this.state);
  }

  componentWillMount = () => this.fetchSubjects();

  returnDateChangeHandler = (returnDate) => {
    this.setState({ returnDate });
  };

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFileChangeHandler = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  subjectOptionsChangeHandler = (selectedSubjectOption) => {
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
    let { returnDate } = this.state;

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
                onChange={this.onChangeHandler}
              />
              <textarea
                className="assignment-description__file"
                placeholder={this.props.description}
                rows="2"
                name="description"
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
              <input
                type="text"
                className="assignment-grade my-3"
                placeholder="Enter Grade"
                name="grade"
                onChange={this.onChangeHandler}
              />
              <Select
                type="text"
                className="assignment-subject mb-3"
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

export default connect(null, { createAssignmentFile })(CreateFile);
