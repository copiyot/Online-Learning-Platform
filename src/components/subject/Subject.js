import React, { Component } from "react";
import { MDBDataTableV5 } from "mdbreact";
import { connect } from "react-redux";

import "./Subject.css";
import CreateSubject from "../createSubject/CreateSubject";
import EditSubject from "../editSubject/EditSubject";
import { updateTopics, deleteSubject, fetchSubjects } from "../../actions";

class Subject extends Component {
  state = {
    selectedSubject: null,
    subjects: [],
    datatable: "",
    subject: "",
  };

  componentWillMount() {
    this.setState({ subjects: this.props.subjects });
  }

  renderModal = (subject) => {
    this.setState({ selectedSubject: subject });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ subjects: nextProps.subjects });
  }

  updateSubjects = () => {
    this.setState({ subjects: this.props.subjects });
  };

  onClickHandler = (subject) => {
    let username = localStorage.getItem("username");
    let topics = subject.topics.filter(
      (topic) =>
        topic.createdBy === username.substring(0, username.indexOf("@")) &&
        topic.subject.id === subject.id
    );
    console.log(topics);
    this.props.updateTopics(topics);
  };

  onEditClickHandler = (subject) => {
    this.setState({ subject });
  };

  onDeleteClickHandler = async (id) => {
    await this.props.deleteSubject(id);
    await this.props.fetchSubjects();
    await this.updateSubjects();
  };

  renderHelper = () => {
    if (this.state.subjects) {
      const data = {
        columns: [
          {
            label: "Code",
            field: "code",
            width: 200,
            attributes: {
              "aria-controls": "DataTable",
              "aria-label": "Name",
            },
          },
          {
            label: "Name",
            field: "name",
            width: 200,
          },
          {
            label: "Description",
            field: "description",
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
        rows: this.state.subjects.map((subject) => {
          return {
            code: subject.code,
            name: subject.name,
            description: subject.description,
            // action: (
            //   <button
            //     type="button"
            //     className="btn not-submitted__assignments"
            //     onClick={() => this.onClickHandler(subject)}
            //   >
            //     View Topic
            //     <i className="fas fa-eye ml-2" aria-hidden="true"></i>
            //   </button>
            // ),
            edit: (
              <button
                type="button"
                className="btn not-submitted__assignments"
                data-toggle="modal"
                data-target="#edit-subject"
                onClick={() => this.onEditClickHandler(subject)}
              >
                Edit
                <i className="far fa-edit ml-2"></i>
              </button>
            ),
            delete: (
              <button
                type="button"
                className="btn not-submitted__assignments"
                onClick={() => this.onDeleteClickHandler(subject.id)}
              >
                Delete
                <i className="fas fa-trash-alt ml-2"></i>
              </button>
            ),
          };
        }),
      };
      return (
        <div className="subject my-5">
          <div className="create-subject p-3">
            <div className="create-buttons">
              <button
                type="button"
                id="sidebarCollapse"
                className="new-scheme btn btn-info py-2 mb-3"
                data-toggle="modal"
                data-target="#create-subject"
              >
                <span>Create new Subject</span>
                <i className="fa fa-plus-circle" aria-hidden="true"></i>
              </button>
            </div>

            <CreateSubject handler={this.updateSubjects} />
            <EditSubject
              subject={this.state.subject}
              handler={this.updateSubjects}
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
    subjects: state.subject.data,
    topics: state.topic.data,
  };
};

export default connect(mapStateToProps, {
  updateTopics,
  deleteSubject,
  fetchSubjects,
})(Subject);
