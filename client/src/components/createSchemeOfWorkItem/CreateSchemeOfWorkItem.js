import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";

import { BASE_URL } from "../api";
import "./CreateSchemeOfWorkItem.css";
import { fetchWorkItems, createSchemeOfWorkItem } from "../../actions";

class CreateSchemeOfWorkItem extends Component {
  state = {
    schemeOfWorks: [],
    subTopics: [],
    topics: [],
    selectedSchemeOfWork: "",
    selectedSubtopic: "",
    status: "",
    week: "",
    lesson: "",
    selectedTopic: "",
    formErrors: {
      selectedSchemeOfWork: "Scheme of works is required",
      selectedTopic: "Topic is required",
      selectedSubtopic: "Sub Topic is required",
      week: "Week is required",
      lesson: "Lesson is required",
    },
  };

  componentWillMount() {
    this.setState({ schemeOfWorks: this.props.schemeOfWorks });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ schemeOfWorks: nextProps.schemeOfWorks });
  }

  fetchTopicData = async (selectedSchemeOfWork) => {
    try {
      const response = await Axios.get(
        BASE_URL +
          "curriculum/topic/searchBySubjectId/" +
          selectedSchemeOfWork +
          "/" +
          localStorage.getItem("username")
      );
      this.setState({ topics: response.data });
    } catch (e) {
      console.log("Failed to fetch scheme" + e);
    }
  };

  fetchSubTopicData = async (topicId) => {
    try {
      const response = await Axios.get(
        BASE_URL + "curriculum/subtopic/searchByTopicId/" + topicId
      );
      this.setState({ subTopics: response.data });
    } catch (e) {
      console.log("Failed to fetch scheme" + e);
    }
  };

  onSchemeOfWorkChangeHandler = async (e) => {
    const { name, value } = e.target;
    const { formErrors } = this.state;
    let scheme = value;
    let arr = scheme.split(":");
    await this.fetchTopicData(arr[1]);

    formErrors.selectedSchemeOfWork = value
      ? ""
      : "Scheme of works is required";

    this.setState({ [name]: scheme });
  };

  onTopicChangeHandler = async (e) => {
    const { name, value } = e.target;
    const { formErrors } = this.state;
    let topicId = value;
    await this.fetchSubTopicData(topicId);

    formErrors.selectedTopic = value ? "" : "Topic is required";

    this.setState({ [name]: topicId });
  };

  onSubTopicChangeHandler = (e) => {
    const { name, value } = e.target;
    const { formErrors } = this.state;

    formErrors.selectedSubtopic = value ? "" : "Sub Topic is required";

    this.setState({ [name]: value }, () => console.log(this.state));
  };

  onChangeHandler = (e) => {
    const { name, value } = e.target;
    const { formErrors } = this.state;

    switch (name) {
      case "week":
        formErrors.week = value ? "" : "Week is required";
        break;

      case "lesson":
        formErrors.lesson = value ? "" : "Lesson is required";
        break;

      default:
        break;
    }

    this.setState({ [name]: value });
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
      selectedSchemeOfWork,
      selectedSubtopic,
      week,
      lesson,
      formErrors,
    } = this.state;

    if (this.formValid(formErrors)) {
      let arr = selectedSchemeOfWork.split(":");
      let data = {
        scheme_of_work_id: arr[0],
        sub_topic_id: selectedSubtopic,
        status: 1,
        week: week,
        lesson: lesson,
        created_by: localStorage.getItem("username"),
      };

      await this.props.createSchemeOfWorkItem(data);

      this.setState({
        selectedSchemeOfWork: "",
        selectedSubtopic: "",
        status: "",
        week: "",
        lesson: "",
        selectedTopic: "",
      });

      await this.props.fetchWorkItems();

      await this.props.handler();
    } else {
      const {
        selectedSchemeOfWork,
        selectedSubtopic,
        week,
        lesson,
        selectedTopic,
      } = formErrors;

      alert(
        selectedSchemeOfWork ||
          selectedTopic ||
          selectedSubtopic ||
          week ||
          lesson
      );
    }
  };

  render() {
    let {
      schemeOfWorks,
      subTopics,
      topics,
      selectedSchemeOfWork,
      selectedSubtopic,
      selectedTopic,
      week,
      lesson,
    } = this.state;
    return (
      <div
        className="modal fade"
        id="create-schemeof__workitem"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                CREATE SCHEME OF WORK ITEM
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
                  <b>Scheme of work:</b>
                </label>
                <select
                  id="inputState"
                  className="form-control"
                  name="selectedSchemeOfWork"
                  value={selectedSchemeOfWork}
                  onChange={this.onSchemeOfWorkChangeHandler}
                >
                  <option>Choose...</option>
                  {schemeOfWorks.map((scheme) => (
                    <option
                      value={scheme.id + ":" + scheme.subjectId}
                      key={scheme.id}
                    >
                      {scheme.description}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="topic">
                  <b>Topic:</b>
                </label>
                <select
                  id="inputState"
                  className="form-control"
                  name="selectedTopic"
                  value={selectedTopic}
                  onChange={this.onTopicChangeHandler}
                >
                  <option>Choose...</option>
                  {topics.map((topic) => (
                    <option value={topic.id} key={topic.id}>
                      {topic.name + " - grade " + topic.grade}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="sub-topic">
                  <b>Sub Topic:</b>
                </label>
                <select
                  id="inputState"
                  className="form-control"
                  name="selectedSubtopic"
                  value={selectedSubtopic}
                  onChange={this.onSubTopicChangeHandler}
                >
                  <option>Choose...</option>
                  {subTopics.map((subTopic) => (
                    <option value={subTopic.id} key={subTopic.id}>
                      {subTopic.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="week">
                  <b>Week:</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="week"
                  placeholder="Week"
                  name="week"
                  value={week}
                  onChange={this.onChangeHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lesson">
                  <b>Lesson:</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="lesson"
                  placeholder="Lesson"
                  name="lesson"
                  value={lesson}
                  onChange={this.onChangeHandler}
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
                className="btn save-schemeof__workitem"
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
    schemeOfWorks: state.schemeOfWork.data,
  };
};

export default connect(mapStateToProps, {
  fetchWorkItems,
  createSchemeOfWorkItem,
})(CreateSchemeOfWorkItem);
