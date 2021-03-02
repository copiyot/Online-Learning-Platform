import React from "react";
import { MDBDataTableV5 } from "mdbreact";
import { connect } from "react-redux";

import "./LessonPlan.css";
import CreateLesson from "../createLesson/CreateLesson";
import EditLesson from "../editLesson/EditLesson";

import { startLesson, fetchLessons } from "../../actions";
import Axios from "axios";
import { BASE_URL } from "../api";

class LessonPlan extends React.Component {
  state = { selectedLesson: null, lessons: [], datatable: "", lesson: "" };

  componentWillMount() {
    this.setState({ lessons: this.props.lessons });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ lessons: nextProps.lessons });
  }

  renderModal = (lesson) => {
    this.setState({ selectedLesson: lesson });
  };

  updateLessons = () => {
    this.setState({ lessons: this.props.lessons });
  };

  onEditClickHandler = (lesson) => {
    this.setState({ lesson });
  };

  onDeleteClickHandler = async (id) => {
    let data = {
      lesson_id: id,
      deactivated_by: localStorage.getItem("username"),
    };

    const response = await Axios.post(BASE_URL + "lesson/deactivate", data, {
      Headers: {
        "Content-Type": "application/json",
      },
    });

    alert(response.data.message);
    await this.props.fetchLessons();
  };

  renderHelper = () => {
    if (this.state.lessons) {
      var dateFormat = require("dateformat");

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
            label: "Subject",
            field: "subject",
            width: 200,
          },
          {
            label: "Topic",
            field: "topic",
            width: 200,
          },
          {
            label: "Sub Topic",
            field: "subTopic",
            sort: "asc",
            width: 200,
          },
          {
            label: "Grade",
            field: "grade",
            sort: "asc",
            width: 200,
          },
          {
            label: "Start Time",
            field: "startTime",
            sort: "asc",
            width: 200,
          },
          {
            label: "End Time",
            field: "endTime",
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
            label: "Start Lesson",
            field: "startLesson",
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
        rows: this.state.lessons.map((lesson) => {
          return {
            name: lesson.name,
            subject: lesson.subject,
            topic: lesson.topic,
            subTopic: lesson.subTopic,
            grade: lesson.grade,
            startTime: dateFormat(lesson.startTime),
            endTime: dateFormat(lesson.endTime),
            dateCreated: dateFormat(lesson.dateCreated),
            startLesson: (
              <button
                type="button"
                id="sidebarCollapse"
                className="start-lesson__button btn btn-info py-2 mb-3"
                onClick={() => this.props.startLesson(lesson.id)}
              >
                <span>Start</span>
                <i className="fa fa-play" aria-hidden="true"></i>
              </button>
            ),
            edit: (
              <button
                type="button"
                className="btn not-submitted__assignments"
                data-toggle="modal"
                data-target="#edit-lesson"
                onClick={() => this.onEditClickHandler(lesson)}
              >
                Edit
                <i className="far fa-edit ml-2"></i>
              </button>
            ),
            delete: (
              <button
                type="button"
                className="btn not-submitted__assignments"
                onClick={() => this.onDeleteClickHandler(lesson.id)}
              >
                Delete
                <i className="fas fa-trash-alt ml-2"></i>
              </button>
            ),
          };
        }),
      };

      return (
        <div className="lesson-plan">
          <div className="create-lesson__plan my-5 p-3">
            <button
              type="button"
              id="sidebarCollapse"
              className="new-scheme btn btn-info py-2 mb-3"
              data-toggle="modal"
              data-target="#create-lesson"
            >
              <span>Create new lesson</span>
              <i className="fa fa-plus-circle" aria-hidden="true"></i>
            </button>
            <CreateLesson handler={this.updateLessons} />
            <EditLesson
              handler={this.updateLessons}
              lesson={this.state.lesson}
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
    }
  };

  render() {
    return <div className="">{this.renderHelper()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    lessons: state.lessons.data,
  };
};

export default connect(mapStateToProps, { startLesson, fetchLessons })(
  LessonPlan
);
