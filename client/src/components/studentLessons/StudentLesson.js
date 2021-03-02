import React from "react";
import { MDBDataTableV5 } from "mdbreact";
import { connect } from "react-redux";

import "./StudentLesson.css";
import { startStudentLesson } from "../../actions";

class StudentLesson extends React.Component {
  state = { lessons: [] };

  componentWillMount() {
    this.setState({ lessons: this.props.lessons });
    console.log(this.props.lessons);
  }

  render() {
    const data = {
      columns: [
        {
          label: "Lesson",
          field: "lesson",
          width: 200,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "Name",
          },
        },
        {
          label: "Password",
          field: "password",
          width: 200,
        },
        {
          label: "Start Time",
          field: "startTime",
          width: 200,
        },
        {
          label: "End Time",
          field: "endTime",
          width: 200,
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
          width: 200,
        },
        {
          label: "Start Lesson",
          field: "startLesson",
          width: 200,
        },
      ],
      rows: this.state.lessons.map((lesson) => {
        return {
          lesson: lesson.lessonName,
          password: lesson.attendeePassword,
          startTime: lesson.startTime,
          endTime: lesson.endTime,
          subject: lesson.subject,
          topic: lesson.topic,
          subTopic: lesson.subTopic,
          startLesson: (
            <button
              type="button"
              className="btn student-start__assessment py-2"
              onClick={() => this.props.startStudentLesson(lesson.id)}
            >
              Start Lessons
              <i className="fa fa-play" aria-hidden="true"></i>
            </button>
          ),
        };
      }),
    };

    return (
      <div className="student-assessment__content">
        <div className="student-assessment__title mb-2">LESSONS</div>
        <div className="student-assessment p-3">
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
  }
}

const mapStateToProps = (state) => {
  return {
    lessons: state.lessons.studentLessons,
  };
};

export default connect(mapStateToProps, { startStudentLesson })(StudentLesson);
