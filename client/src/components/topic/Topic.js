import React, { Component } from "react";
import { MDBDataTableV5 } from "mdbreact";
import { connect } from "react-redux";

import "./Topic.css";
import CreateTopic from "../createTopic/CreateTopic";
import { updateSubTopics, deleteTopic, fetchTopic } from "../../actions";
import EditTopic from "../editTopic/EditTopic";

class Topic extends Component {
  state = {
    selectedTopic: null,
    topics: [],
    datatable: "",
    topic: "",
  };

  componentWillMount() {
    this.setState({ topics: this.props.topics });
  }

  renderModal = (topic) => {
    this.setState({ selectedTopic: topic });
  };

  updateTopics = () => {
    this.setState({ topics: this.props.topics });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ topics: nextProps.topics });
  }

  renderDataTable = () => {
    return (
      <MDBDataTableV5
        hover
        entriesOptions={[5, 20, 25]}
        entries={5}
        pagesAmount={4}
        data={this.state.datatable}
        searchTop
        searchBottom={false}
      />
    );
  };

  onClickHandler = (topic) => {
    let subTopics = topic.sub_topics;
    this.props.updateSubTopics(subTopics);
  };

  onEditClickHandler = (topic) => {
    this.setState({ topic });
  };

  onDeleteClickHandler = async (id) => {
    await this.props.deleteTopic(id);
    await this.props.fetchTopic();
    await this.updateTopics();
  };

  renderHelper = () => {
    if (this.state.topics) {
      const data = {
        columns: [
          {
            label: "Topic Name",
            field: "name",
            width: 200,
            attributes: {
              "aria-controls": "DataTable",
              "aria-label": "Name",
            },
          },
          {
            label: "Subject",
            field: "subjectName",
            width: 200,
          },
          {
            label: "Description",
            field: "description",
            width: 200,
          },
          {
            label: "Objective",
            field: "objective",
            width: 200,
          },
          {
            label: "Grade",
            field: "grade",
            sort: "asc",
            width: 200,
          },
          {
            label: "Date Created",
            field: "dateCreated",
            sort: "asc",
            width: 200,
          },
          // {
          //   label: "View",
          //   field: "action",
          //   width: 200,
          // },
          {
            label: "Edit",
            field: "edit",
            width: 200,
          },
          {
            label: "Delete",
            field: "delete",
            width: 200,
          },
        ],
        rows: this.state.topics.map((topic) => {
          return {
            name: topic.name,
            subjectName: topic.subjectName,
            description: topic.description,
            objective: topic.objective,
            grade: topic.grade,
            dateCreated: topic.date_created.substring(
              0,
              topic.date_created.indexOf("T")
            ),
            // action: (
            //   <button
            //     type="button"
            //     className="btn not-submitted__assignments"
            //     onClick={() => this.onClickHandler(topic)}
            //   >
            //     View Sub Topic
            //     <i className="fas fa-eye ml-2" aria-hidden="true"></i>
            //   </button>
            // ),
            edit: (
              <button
                type="button"
                className="btn not-submitted__assignments"
                data-toggle="modal"
                data-target="#edit-topic"
                onClick={() => this.onEditClickHandler(topic)}
              >
                Edit
                <i className="far fa-edit ml-2"></i>
              </button>
            ),
            delete: (
              <button
                type="button"
                className="btn not-submitted__assignments"
                onClick={() => this.onDeleteClickHandler(topic.id)}
              >
                Delete
                <i className="fas fa-trash-alt ml-2"></i>
              </button>
            ),
          };
        }),
      };
      return (
        <div className="topic mb-4">
          <div className="create-topic p-3">
            <button
              type="button"
              id="sidebarCollapse"
              className="new-scheme btn btn-info py-2 mb-3"
              data-toggle="modal"
              data-target="#create-topic"
            >
              <span>Create Topic</span>
              <i className="fa fa-plus-circle" aria-hidden="true"></i>
            </button>
            <CreateTopic handler={this.updateTopics} />
            <EditTopic handler={this.updateTopics} topic={this.state.topic} />
            <MDBDataTableV5
              hover
              entriesOptions={[5, 20, 25]}
              entries={5}
              pagesAmount={4}
              data={data}
              searchTop
              searchBottom={false}
            />
          </div>
        </div>
      );
    } else {
      return <div className="spinner">...Loading</div>;
    }
  };

  render() {
    return <div className="">{this.renderHelper()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    topics: state.topic.data,
    updatedTopics: state.topic.updateTopic,
  };
};

export default connect(mapStateToProps, {
  updateSubTopics,
  deleteTopic,
  fetchTopic,
})(Topic);
