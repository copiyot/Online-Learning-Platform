import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";

import { BASE_URL } from "../api";
import "../createSchemeOfWorkItem/CreateSchemeOfWorkItem.css";
import { fetchWorkItems, createSchemeOfWorkItem } from "../../actions";

class EditSchemeOfWorkItem extends Component {
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
    id: "",
    formErrors: {
      selectedSchemeOfWork: "",
      selectedTopic: "",
      selectedSubtopic: "",
      week: "",
      lesson: "",
    },
  };

  componentWillMount() {
    this.setState({ schemeOfWorks: this.props.schemeOfWorks });
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  async componentWillReceiveProps(nextProps) {
    console.log(nextProps.scheme);
    const {
      id,
      sub_topic_id,
      topic_id,
      week,
      lesson,
      subject_id,
      schem_of_Work_item_id,
    } = nextProps.scheme;

    let selectedSchemeOfWork = id + ":" + subject_id;

    let arr = selectedSchemeOfWork.split(":");
    await this.fetchTopicData(arr[1]);

    await this.fetchSubTopicData(topic_id);

    this.setState({
      selectedSchemeOfWork,
      selectedSubtopic: sub_topic_id,
      selectedTopic: topic_id,
      week,
      lesson,
      id: schem_of_Work_item_id,
    });
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
      id,
    } = this.state;

    if (this.formValid(formErrors)) {
      let arr = selectedSchemeOfWork.split(":");
      let data = {
        scheme_of_work_id: arr[0],
        sub_topic_id: selectedSubtopic,
        status: 0,
        week: week,
        lesson: lesson,
        created_by: localStorage.getItem("username"),
        id,
      };

      // await this.props.createSchemeOfWorkItem(data);
      const response = await Axios.put(
        BASE_URL + "curriculum/scheme_of_work_item/update",
        data
      );

      alert(response.data.message);

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
        id="edit-schemeof__workitem"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                EDIT SCHEME OF WORK ITEM
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
                  onChange={this.onSchemeOfWorkChangeHandler}
                  value={selectedSchemeOfWork || ""}
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
                  onChange={this.onTopicChangeHandler}
                  value={selectedTopic || ""}
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
                  onChange={this.onSubTopicChangeHandler}
                  value={selectedSubtopic || ""}
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
                  onChange={this.onChangeHandler}
                  value={week || ""}
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
                  onChange={this.onChangeHandler}
                  value={lesson || ""}
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
})(EditSchemeOfWorkItem);
