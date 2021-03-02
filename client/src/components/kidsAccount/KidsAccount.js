import React from "react";
import Axios from "axios";

import { BASE_URL } from "../api";
import "./KidsAccount.css";

class KidsAccount extends React.Component {
  state = {
    attendedLessons: "",
    grade: "",
    missedLessons: "",
    subjects: [],
  };

  componentDidMount() {
    this.fetchKidsDetails(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchKidsDetails(nextProps.id);
  }

  fetchKidsDetails = async (id) => {
    const response = await Axios.get(BASE_URL + `lesson/student/${id}`);

    let attendedLessons = response.data.attendedLessons.length;
    let grade = response.data.grade;
    let missedLessons = response.data.missedLessons.length;
    let subjects = response.data.subjects;

    this.setState({
      attendedLessons,
      grade,
      missedLessons,
      subjects,
    });
    console.log(response.data);
  };

  render() {
    const { attendedLessons, grade, missedLessons, subjects } = this.state;

    let count = 1;

    return (
      <div className="kids-account">
        <div className="">
          <div className="student-assessment__title mb-2">
            {" "}
            <span className="kid-name">{`${this.props.firstName} ${this.props.lastName} DATA`}</span>{" "}
          </div>
          <div className="grade-enrolled container">
            <div className="grade-enrolled__label">
              <strong>Grade Enrolled:</strong>
            </div>
            <div className="grade-enrolled__value">{grade}</div>
          </div>
          <div className="subjects-enrolled container">
            <div className="subjects-enrolled__label">
              <strong>Subjects Enrolled:</strong>
            </div>
            <div className="subjects-enrolled__value">
              {subjects.map((subject) => (
                <div className="subject-enrolled__value" key={count++}>
                  {subject}
                </div>
              ))}
            </div>
          </div>
          <div className="lessons-attended container">
            <div className="lessons-attended__label">
              <strong>Lessons Attended:</strong>
            </div>
            <div className="lessons-attended__value">{attendedLessons}</div>
          </div>
          <div className="lessons-absent container">
            <div className="lessons-absent__label">
              <strong>Lessons Absent: </strong>
            </div>
            <div className="lessons-absent__value">{missedLessons}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default KidsAccount;
