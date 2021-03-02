import React, { Component } from "react";
import { MDBDataTableV5 } from "mdbreact";
import { connect } from "react-redux";

import "../subject/Subject.css";
import ChooseSubject from "../chooseSubject/ChooseSubjects";
import { updateTopics } from "../../actions";

class TeacherSelectedSubject extends Component {
  state = {
    selectedSubject: null,
    subjects: [],
    datatable: "",
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

  displayData = (subject) => {
    return (
      <div
        data-toggle="modal"
        style={{ color: "green" }}
        data-target="#editCustomer"
        onClick={() => this.renderModal(subject)}
      >
        view
      </div>
    );
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
                data-target="#choose-subject"
              >
                <span>Choose Your Subjects</span>
                <i className="fa fa-plus-circle" aria-hidden="true"></i>
              </button>
            </div>

            <ChooseSubject />
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
    subjects: state.subject.selectedSubjects,
    topics: state.topic.data,
  };
};

export default connect(mapStateToProps, { updateTopics })(
  TeacherSelectedSubject
);
