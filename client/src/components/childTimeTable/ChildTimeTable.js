import React from "react";
import Axios from "axios";

import "../timeTable/TimeTable.css";
import { connect } from "react-redux";
import { BASE_URL } from "../api";

import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  MonthAgenda,
} from "@syncfusion/ej2-react-schedule";

class ChildTimeTable extends React.Component {
  state = { dates: [], lessons: [], username: "" };

  componentWillMount() {
    this.fetchStudentLessons(this.props.username);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchStudentLessons(nextProps.username);
  }

  onPopupOpen(args) {
    args.cancel = true;
    // console.log(args.value);
  }

  fetchStudentLessons = async (username) => {
    try {
      const response = await Axios.get(BASE_URL + `lesson/list/${username}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      this.setState({ lessons: response.data });
      console.log(response.data);
    } catch (e) {
      console.log("Failed to create assignment" + e);
    }
  };

  render() {
    console.log(this.state.lessons);
    return (
      <div className="time-table">
        <div className="student-assessment__title mb-2">
          {" "}
          <span className="kid-name">{`${this.props.firstName} ${this.props.lastName} TIME TABLE`}</span>{" "}
        </div>
        <ScheduleComponent
          currentView="Month"
          eventSettings={{
            dataSource: this.state.lessons.map((lesson) => {
              return {
                EndTime: lesson.endTime,
                StartTime: lesson.startTime,
                Subject: lesson.subTopic,
                IsReadonly: true,
              };
            }),
          }}
          popupOpen={this.onPopupOpen.bind(this)}
        >
          <Inject services={[Day, Week, WorkWeek, Month, MonthAgenda]} />
        </ScheduleComponent>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lessons: state.lessons.studentLessons,
  };
};

export default connect(mapStateToProps)(ChildTimeTable);
