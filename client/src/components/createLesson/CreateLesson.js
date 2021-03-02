import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";

import { createLesson, fetchLessons } from "../../actions";
import "./CreateLesson.css";

class CreateLesson extends Component {
  state = {
    selectedSchemeOfWorkItem: "",
    schemeOfWorkItems: [],
    startTime: "",
    endTime: "",
    attendeePassword: "",
    moderatorPassword: "",
    recurring: "",
    formErrors: {
      selectedSchemeOfWorkItem: "Scheme of Work Item is required",
      startTime: "Start Time is required",
      endTime: "End Time is required",
      attendeePassword: "Attendee password is required",
      moderatorPassword: "Moderator password is required",
      recurring: "State whether the Lesson is recurring or not",
    },
  };

  onSchemeOWorkItemChangeHandler = (e) => {
    const { name, value } = e.target;
    const { formErrors } = this.state;

    formErrors.selectedSchemeOfWorkItem = value
      ? ""
      : "Scheme of Work Item is required";

    this.setState({ [name]: value });
  };

  onRecurrChangeHandler = (e) => {
    const { name, value } = e.target;
    const { formErrors } = this.state;

    formErrors.recurring = value
      ? ""
      : "State whether the Lesson is recurring or not";

    this.setState({ [name]: value });
  };

  handleStartChange = (startTime) => {
    const { formErrors } = this.state;

    formErrors.startTime = this.state.startTime ? "" : "Start Time is required";

    this.setState({
      startTime,
    });
  };

  handleEndChange = (endTime) => {
    const { formErrors } = this.state;

    formErrors.endTime = this.state.endTime ? "" : "End Time is required";

    this.setState({
      endTime,
    });
  };

  formValid = (formErrors) => {
    let valid = true;

    Object.values(formErrors).forEach((val) => {
      val.length > 0 && (valid = false);
    });

    return valid;
  };

  onChangeHandler = (e) => {
    const { name, value } = e.target;
    const { formErrors } = this.state;

    switch (name) {
      case "attendeePassword":
        formErrors.attendeePassword = value
          ? ""
          : "Attendee password is required";
        break;

      case "moderatorPassword":
        formErrors.moderatorPassword = value
          ? ""
          : "Moderator password is required";
        break;

      default:
        break;
    }

    this.setState({ [name]: value });
  };

  componentWillMount() {
    this.setState({ schemeOfWorkItems: this.props.schemeOfWorkItems });
  }

  onSubmitHandler = async () => {
    const {
      selectedSchemeOfWorkItem,
      startTime,
      endTime,
      moderatorPassword,
      attendeePassword,
      recurring,
      formErrors,
    } = this.state;

    if (this.formValid(formErrors)) {
      let data = {
        scheme_of_work_item_id: selectedSchemeOfWorkItem,
        start_time: startTime,
        end_time: endTime,
        attendee_password: attendeePassword,
        moderator_password: moderatorPassword,
        recurring: recurring,
        created_by: localStorage.getItem("username"),
      };
      console.log("submit", JSON.stringify(data));

      await this.props.createLesson(data);

      this.setState({
        selectedSchemeOfWorkItem: "",
        startTime: "",
        endTime: "",
        attendeePassword: "",
        moderatorPassword: "",
        recurring: "",
      });

      await this.props.fetchLessons();

      await this.props.handler();
    } else {
      const {
        selectedSchemeOfWorkItem,
        startTime,
        endTime,
        attendeePassword,
        moderatorPassword,
        recurring,
      } = formErrors;

      alert(
        selectedSchemeOfWorkItem ||
          startTime ||
          endTime ||
          attendeePassword ||
          moderatorPassword ||
          recurring
      );
    }
  };

  renderHelper = () => {
    let {
      schemeOfWorkItems,
      startTime,
      endTime,
      selectedSchemeOfWorkItem,
      attendeePassword,
      moderatorPassword,
      recurring,
    } = this.state;
    if (schemeOfWorkItems) {
      return (
        <div
          className="modal fade"
          id="create-lesson"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  CREATE LESSON
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
                  <label htmlFor="scheme-of__work">
                    {" "}
                    <b>Scheme of work item:</b>{" "}
                  </label>
                  <select
                    id="scheme-of__work"
                    className="form-control"
                    onChange={this.onSchemeOWorkItemChangeHandler}
                    name="selectedSchemeOfWorkItem"
                    value={selectedSchemeOfWorkItem}
                  >
                    <option defaultValue>Choose...</option>
                    {schemeOfWorkItems.map((scheme) => (
                      <option
                        value={scheme.schem_of_Work_item_id}
                        key={scheme.schem_of_Work_item_id}
                      >
                        {"Grade:" +
                          scheme.grade +
                          "|Lesson:" +
                          scheme.lesson +
                          "|" +
                          scheme.sub_topic}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="start-date mb-2">
                  <label
                    className="start-date__label mr-2"
                    htmlFor="start-date__picker"
                  >
                    <b>Start time and date:</b>
                  </label>
                  <DatePicker
                    selected={startTime}
                    id="start-date__picker"
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    onChange={this.handleStartChange}
                  />
                </div>
                <div className="end-date mb-2">
                  <label
                    className="end-date__label mr-3"
                    htmlFor="end-date__picker"
                  >
                    <b>End time and date:</b>
                  </label>
                  <DatePicker
                    selected={endTime}
                    id="end-date__picker"
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    onChange={this.handleEndChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="attendee-password">
                    <b>Attendee password:</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="attendee-password"
                    placeholder="attendee password"
                    name="attendeePassword"
                    value={attendeePassword}
                    onChange={this.onChangeHandler}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="moderator-password">
                    <b>Moderator password:</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="moderator-password"
                    name="moderatorPassword"
                    value={moderatorPassword}
                    placeholder="moderator password"
                    onChange={this.onChangeHandler}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="scheme-of__work">
                    {" "}
                    <b>Recurring:</b>{" "}
                  </label>
                  <select
                    id="scheme-of__work"
                    className="form-control"
                    name="recurring"
                    value={recurring}
                    onChange={this.onRecurrChangeHandler}
                  >
                    <option defaultValue>Choose...</option>
                    <option value="true">YES</option>
                    <option value="false">NO</option>
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
                  className="btn save-create__lesson"
                  onClick={this.onSubmitHandler}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    return <div className="">{this.renderHelper()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    schemeOfWorkItems: state.schemeOfWorkItems.data,
  };
};

export default connect(mapStateToProps, { createLesson, fetchLessons })(
  CreateLesson
);
