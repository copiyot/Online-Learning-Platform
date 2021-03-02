import React, { Component } from "react";
import { connect } from "react-redux";

import "../createSubTopic/CreateSubTopic.css";
import {
  createSubTopic,
  fetchSubTopic,
  fetchTopic,
  editSubTopic,
} from "../../actions";

class EditSubTopic extends Component {
  state = {
    id: "",
    topics: [],
    selectedTopic: "",
    name: "",
    addeObjectiveInputs: [],
    addedActivitiesInputs: [],
    addedLearnMatInputs: [],
    activities: [],
    learningMaterials: [],
    reference: "",
    objectives: {},
    objective: [],
    act: {},
    learningMat: {},
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.subTopic);
    if (nextProps.subTopic) {
      const {
        id,
        topic_id,
        name,
        objective,
        activities,
        learning_materials,
        reference,
      } = nextProps.subTopic;

      const { objectives, act, learningMat, objectiveInputs } = this.state;

      let count = 1;
      let activityCount = 1;
      let countLearn = 1;

      for (let char of objective) {
        objectives[count] = char;
        count++;
      }

      for (let char of activities) {
        act[activityCount] = char;
        activityCount++;
      }

      for (let char of learning_materials) {
        learningMat[countLearn] = char;
        countLearn++;
      }

      this.setState(
        {
          topics: nextProps.topics,
          id,
          selectedTopic: topic_id,
          name,
          objectiveInputs,
          objectives,
          activities,
          act,
          learningMaterials: learning_materials,
          learningMat,
          reference,
          objective,
        },
        console.log(this.state)
      );
    }
  }

  addObjectives = () => {
    const { addeObjectiveInputs, objective } = this.state;

    let count = objective.length + 1;

    let input = (
      <input
        type="text"
        className="form-control mb-2"
        placeholder="topic name"
        name={count}
        onChange={this.onObjectivesChangeHandler}
        key={count++}
      />
    );

    addeObjectiveInputs.push(input);
    this.setState({ addeObjectiveInputs });
  };

  addActivities = () => {
    const { activities, addedActivitiesInputs } = this.state;

    let count = activities.length + 1;

    let input = (
      <input
        type="text"
        className="form-control mb-2"
        placeholder="topic name"
        name={count}
        onChange={this.onActivitiesChangeHandler}
        key={count++}
      />
    );

    addedActivitiesInputs.push(input);
    this.setState({ addedActivitiesInputs });
  };

  addLearnMat = () => {
    const { learningMaterials, addedLearnMatInputs } = this.state;

    let count = learningMaterials.length + 1;

    let input = (
      <input
        type="text"
        className="form-control mb-2"
        placeholder="topic name"
        name={count}
        onChange={this.onLearningChangeHandler}
        key={count++}
      />
    );

    addedLearnMatInputs.push(input);
    this.setState({ addedLearnMatInputs });
  };

  onChangeHandler = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value }, console.log(this.state));
  };

  onObjectivesChangeHandler = (e) => {
    const { name, value } = e.target;
    const { objectives } = this.state;

    objectives[name] = value;
    this.setState({ objectives }, console.log(this.state));
  };

  onActivitiesChangeHandler = (e) => {
    const { name, value } = e.target;
    const { act } = this.state;

    act[name] = value;
    this.setState({ act }, console.log(this.state));
  };

  onLearningChangeHandler = (e) => {
    const { name, value } = e.target;
    const { learningMat } = this.state;

    learningMat[name] = value;
    this.setState({ learningMat }, console.log(this.state));
  };

  onSubmitHandler = async () => {
    const {
      id,
      selectedTopic,
      name,
      objectives,
      act,
      learningMat,
      reference,
    } = this.state;

    let object = Object.values(objectives);
    let activity = Object.values(act);
    let learnMat = Object.values(learningMat);

    let data = {
      id,
      topic_id: selectedTopic,
      name,
      objective: object,
      activities: activity,
      learning_materials: learnMat,
      reference,
      created_by: localStorage.getItem("username"),
    };

    console.log(data);
    await this.props.editSubTopic(data);
    await this.props.fetchSubTopic();
    await this.props.handler();
  };

  renderHelper = () => {
    const {
      topics,
      name,
      addeObjectiveInputs,
      addedActivitiesInputs,
      addedLearnMatInputs,
      activities,
      learningMaterials,
      reference,
      selectedTopic,
      act,
      learningMat,
      objectives,
      objective,
    } = this.state;

    let count = 1;
    let activityCount = 1;
    let countLearn = 1;

    return (
      <div
        className="modal fade"
        id="edit-sub__topic"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                EDIT SUB TOPIC
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
                  value={selectedTopic || ""}
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
                  value={name || ""}
                  onChange={this.onChangeHandler}
                />
              </div>
              <div className="mb-3">
                <span className="objective-title mb-2">Objectives</span>
                {objective.map((obj) => {
                  return (
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="topic name"
                      name={count}
                      value={objectives[count] || ""}
                      onChange={this.onObjectivesChangeHandler}
                      key={count++}
                    />
                  );
                })}
                {addeObjectiveInputs.map((input) => input)}
                <button className="add-button" onClick={this.addObjectives}>
                  Add objective
                </button>
              </div>
              <div className="mb-3">
                <span className="objective-title mb-2">Activities</span>
                {activities.map((activity) => {
                  return (
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="topic name"
                      name={activityCount}
                      value={act[activityCount] || ""}
                      onChange={this.onActivitiesChangeHandler}
                      key={activityCount++}
                    />
                  );
                })}
                {addedActivitiesInputs.map((activity) => activity)}
                <button className="add-button" onClick={this.addActivities}>
                  Add activity
                </button>
              </div>
              <div className="mb-3">
                <span className="objective-title mb-2">Learning Materials</span>
                {learningMaterials.map((learningMaterial) => {
                  return (
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="topic name"
                      name={countLearn}
                      value={learningMat[countLearn] || ""}
                      onChange={this.onLearningChangeHandler}
                      key={countLearn++}
                    />
                  );
                })}
                {addedLearnMatInputs.map((learnMat) => learnMat)}
                <button className="add-button" onClick={this.addLearnMat}>
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
                  value={reference || ""}
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
  };

  render() {
    return <div className="">{this.renderHelper()}</div>;
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
  editSubTopic,
})(EditSubTopic);
