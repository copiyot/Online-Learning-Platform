import React, { Component } from "react";
import { connect } from "react-redux";

import "./CreateSubTopic.css";
import { createSubTopic, fetchSubTopic, fetchTopic } from "../../actions";

class CreateSubTopic extends Component {
  state = {
    topics: [],
    selectedTopic: "",
    name: "",
    objective: [],
    activities: [],
    learningMaterials: [],
    reference: "",
  };

  componentDidMount() {
    this.setState({ topics: this.props.topics });
    this.addObject();
    this.addActivity();
    this.addLearninMats();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ topics: nextProps.topics });
  }

  addObject() {
    var array = this.state.objective;
    var size = array.length + 1;
    array.push(
      <div className="form-group" key={"objective" + size}>
        <label htmlFor="objective">
          <b>{"Objective " + size}:</b>
        </label>
        <input
          type="text"
          className="form-control"
          id="objective"
          placeholder="objective"
          name={"objective" + size}
          onChange={this.onChangeHandler}
        />
      </div>
    );
    this.setState({
      objective: array,
    });
  }

  addActivity() {
    var array = this.state.activities;
    var size = array.length + 1;
    array.push(
      <div className="form-group" key={"activity" + size}>
        <label htmlFor="activities">
          <b>{"Activity " + size}:</b>
        </label>
        <input
          type="text"
          className="form-control"
          id="activities"
          placeholder="Activities"
          name={"activity" + size}
          onChange={this.onChangeHandler}
        />
      </div>
    );
    this.setState({
      activities: array,
    });
  }

  addLearninMats() {
    var array = this.state.learningMaterials;
    var size = array.length + 1;
    array.push(
      <div className="form-group" key={"learningMaterials" + size}>
        <label htmlFor="learning-materials">
          <b>{"Learning Material " + size}:</b>
        </label>
        <input
          type="text"
          className="form-control"
          id="learning-materials"
          placeholder="Learning Material"
          name={"learningMaterials" + size}
          onChange={this.onChangeHandler}
        />
      </div>
    );
    this.setState({
      learningMaterials: array,
    });
  }

  composeObjectives = () => {
    const { objective, fields, ...inputFields } = this.state;
    let array = [];
    for (var i = 0; i < objective.length; i++) {
      if (inputFields["objective" + (i + 1)]) {
        array.push(inputFields["objective" + (i + 1)]);
      } else {
        alert("Fill all objectives");
        return null;
      }
    }
    return array;
  };

  composeActivities = () => {
    const { activities, fields, ...inputFields } = this.state;
    let array = [];
    for (var i = 0; i < activities.length; i++) {
      if (inputFields["activity" + (i + 1)]) {
        array.push(inputFields["activity" + (i + 1)]);
      } else {
        alert("Fill all activities");
        return null;
      }
    }
    return array;
  };

  composeLearningMats = () => {
    const { learningMaterials, fields, ...inputFields } = this.state;
    let array = [];
    for (var i = 0; i < learningMaterials.length; i++) {
      if (inputFields["learningMaterials" + (i + 1)]) {
        array.push(inputFields["learningMaterials" + (i + 1)]);
      } else {
        alert("Fill all learning materials");
        return null;
      }
    }
    return array;
  };

  onChangeHandler = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value }, () => console.log(this.state));
  };

  onTopicChangeHandler = (e) => {
    this.setState({ selectedTopic: e.target.value });
  };

  onSubmitHandler = async () => {
    const {
      selectedTopic,
      reference,
      name,
      objective,
      activities,
      learningMaterials,
      fields,
      ...inputFields
    } = this.state;
    console.log("SUB TOPIC:" + JSON.stringify(inputFields));
    if (reference && name && selectedTopic) {
      let objectives = this.composeObjectives();
      if (objectives === null) return;
      let activities = this.composeActivities();
      if (activities === null) return;
      let learningMats = this.composeLearningMats();

      if (objectives && activities && learningMats) {
        let json = {
          topic_id: selectedTopic,
          name: name,
          reference: reference,
          created_by: localStorage.getItem("username"),
          objective: objectives,
          activities: activities,
          learning_materials: learningMats,
        };

        await this.props.createSubTopic(json);

        await this.props.fetchSubTopic();

        await this.props.handler();

        this.setState({
          topics: [],
          selectedTopic: "",
          name: "",
          objective: [],
          activities: [],
          learningMaterials: [],
          reference: "",
        });
      }
    } else {
      alert("Fill name, Topic and reference!");
    }
  };

  render() {
    const {
      topics,
      name,
      objective,
      activities,
      learningMaterials,
      reference,
    } = this.state;

    console.log(this.state.topics);
    return (
      <div
        className="modal fade"
        id="create-subtopic__modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                CREATE SUB TOPIC
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
                  <b>Topic:</b>
                </label>
                <select
                  id="inputState"
                  className="form-control"
                  onChange={this.onChangeHandler}
                  name="selectedTopic"
                >
                  <option key="99999">Select topic..</option>
                  {topics.map((topic) => (
                    <option value={topic.id} key={topic.id}>
                      {topic.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="subtopic-name">
                  <b>Sub Topic Name:</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="subtopic-name"
                  placeholder="topic name"
                  name="name"
                  value={name}
                  onChange={this.onChangeHandler}
                />
              </div>
              <div>
                {objective.map((input) => {
                  return input;
                })}
                <button
                  className="add-button"
                  onClick={this.addObject.bind(this)}
                >
                  Add objective
                </button>
              </div>
              <div>
                {activities.map((input) => {
                  return input;
                })}
                <button
                  className="add-button"
                  onClick={this.addActivity.bind(this)}
                >
                  Add activity
                </button>
              </div>
              <div>
                {learningMaterials.map((input) => {
                  return input;
                })}
                <button
                  className="add-button"
                  onClick={this.addLearninMats.bind(this)}
                >
                  Add learning material
                </button>
              </div>
              <div className="form-group">
                <label htmlFor="reference">
                  <b>Reference:</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="reference"
                  placeholder="reference"
                  name="reference"
                  value={reference}
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
                className="btn save-subtopic"
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
    topics: state.topic.data,
  };
};

export default connect(mapStateToProps, {
  createSubTopic,
  fetchSubTopic,
  fetchTopic,
})(CreateSubTopic);
