import React, { Component } from "react";
import { MDBDataTableV5 } from "mdbreact";
import Axios from "axios";
import { connect } from "react-redux";

import { BASE_URL } from "../api";
import "./SubTopic.css";
import CreateSubTopic from "../createSubTopic/CreateSubTopic";
import EditSubTopic from "../editSubTopic/EditSubTopic";
import { deleteSubTopic } from "../../actions";

class SubTopic extends Component {
  state = {
    selectedSubTopic: null,
    subTopics: [],
    datatable: "",
    subTopic: "",
  };

  componentWillMount() {
    this.setState({ subTopics: this.props.subTopics });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ subTopics: nextProps.subTopics });
  }

  renderModal = (subTopic) => {
    this.setState({ selectedSubTopic: subTopic });
  };

  updateSubTopics = () => {
    this.setState({ subTopics: this.props.subTopics });
  };

  formatList = (list) => {
    var count = 1;
    return (
      <ul>
        {list.map((lst) => {
          return <li key={count++}>{lst}</li>;
        })}
      </ul>
    );
  };

  fetchData = async () => {
    try {
      const response = await Axios.get(
        BASE_URL +
          "curriculum/subtopic/searchByUsername/" +
          localStorage.getItem("username")
      );
      console.log(response.data);
      this.setState({ subTopics: response.data });
    } catch (e) {
      console.log("Failed to fetch scheme" + e);
    }
  };

  onEditClickHandler = (subTopic) => {
    this.setState({ subTopic });
  };

  onDeleteClickHandler = (id) => {
    this.props.deleteSubTopic(id);
  };

  renderHelper = () => {
    if (this.state.subTopics) {
      const data = {
        columns: [
          {
            label: "Name",
            field: "name",
            width: 200,
            attributes: {
              "aria-controls": "DataTable",
              "aria-label": "Name",
            },
          },
          {
            label: "Topic",
            field: "topic",
            width: 200,
          },
          {
            label: "Objective",
            field: "objective",
            width: 200,
          },
          {
            label: "Activities",
            field: "activities",
            width: 200,
          },
          {
            label: "Learning Materials",
            field: "learningMaterials",
            sort: "asc",
            width: 200,
          },
          {
            label: "Reference",
            field: "reference",
            sort: "asc",
            width: 200,
          },
          {
            label: "Date Created",
            field: "dateCreated",
            sort: "asc",
            width: 200,
          },
          {
            label: "Edit",
            field: "edit",
            sort: "asc",
            width: 200,
          },
          {
            label: "Delete",
            field: "delete",
            sort: "asc",
            width: 200,
          },
        ],
        rows: this.state.subTopics.map((subTopic) => {
          return {
            name: subTopic.name,
            topic: subTopic.topic_name,
            objective: this.formatList(subTopic.objective),
            activities: this.formatList(subTopic.activities),
            learningMaterials: this.formatList(subTopic.learning_materials),
            reference: subTopic.reference,
            dateCreated: subTopic.date_created.substring(
              0,
              subTopic.date_created.indexOf("T")
            ),
            edit: (
              <button
                type="button"
                className="btn not-submitted__assignments"
                data-toggle="modal"
                data-target="#edit-sub__topic"
                onClick={() => this.onEditClickHandler(subTopic)}
              >
                Edit
                <i className="far fa-edit ml-2"></i>
              </button>
            ),
            delete: (
              <button
                type="button"
                className="btn not-submitted__assignments"
                onClick={() => this.onDeleteClickHandler(subTopic.id)}
              >
                Delete
                <i className="fas fa-trash-alt ml-2"></i>
              </button>
            ),
          };
        }),
      };
      return (
        <div className="subTopic mb-3">
          <div className="create-subTopic p-3">
            <button
              type="button"
              id="sidebarCollapse"
              className="new-scheme btn btn-info py-2 mb-3"
              data-toggle="modal"
              data-target="#create-subtopic__modal"
            >
              <span>Create Sub Topic</span>
              <i className="fa fa-plus-circle" aria-hidden="true"></i>
            </button>
            <CreateSubTopic handler={this.updateSubTopics} />
            <EditSubTopic
              handler={this.updateSubTopics}
              subTopic={this.state.subTopic}
            />
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
    subTopics: state.subTopic.data,
  };
};

export default connect(mapStateToProps, { deleteSubTopic })(SubTopic);
