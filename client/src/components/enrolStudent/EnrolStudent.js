import React from "react";
import Select from "react-select";
import { connect } from "react-redux";
import Axios from "axios";
import { BASE_URL } from "../api";

import "./EnrolStudent.css";
import {
  fetchStudentAssessments,
  fetchStudentAssignments,
  fetchStudentLessons,
} from "../../actions";

class EnrolStudent extends React.Component {
  state = {
    subjects: [],
    selectedSubject: "",
    teachers: [],
    selectedTeacher: "",
  };

  componentWillMount() {
    this.fetchSubjects();
  }

  subjectOptionsChangeHandler = (selectedSubjectOption) => {
    this.setState({ selectedSubject: selectedSubjectOption.value });
    this.fetchTeachers(selectedSubjectOption.value);
  };

  teacherOptionsChangeHandler = (selectedSubjectOption) => {
    this.setState({ selectedTeacher: selectedSubjectOption.value });
  };

  renderSubjects = () => {
    let subjects = this.state.subjects.map((subject) => ({
      value: subject.id,
      label: subject.name,
      code: subject.code,
      description: subject.description,
      topics: subject.topics,
    }));
    return subjects;
  };

  fetchSubjects = async () => {
    try {
      const response = await Axios.get(BASE_URL + "curriculum/subject/list");
      this.setState({ subjects: response.data });
    } catch (e) {
      alert("Failed to fetch scheme" + e);
    }
  };

  fetchTeachers = async (id) => {
    try {
      let response = await Axios.get(
        BASE_URL + `teacher/secured/teachers-bysubject/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      this.setState({ teachers: response.data });
    } catch (e) {
      alert("Failed to fetch teachers" + e);
    }
  };

  renderTeachers = () => {
    let teachers = this.state.teachers.map((teacher) => ({
      value: teacher.id,
      label: `${teacher.user.firstName} ${teacher.user.lastName}`,
    }));
    return teachers;
  };

  enrolStudents = async () => {
    const { selectedSubject, selectedTeacher } = this.state;
    let id = localStorage.getItem("studentId");

    let json = {
      subject_id: selectedSubject,
      teacher_id: selectedTeacher,
      student_id: parseInt(id),
      self_registered: true,
    };

    this.enrolStudent(json);
    await this.props.fetchStudentAssessments();
    await this.props.fetchStudentAssignments();
    await this.props.fetchStudentLessons();
  };

  enrolStudent = async (formValues) => {
    try {
      const response = await Axios.post(
        BASE_URL + `student/enroll/`,
        formValues
      );
      alert(response.data.message);
    } catch (e) {
      alert("Failed to enrol student" + e);
    }
  };

  render() {
    let options = this.renderSubjects();
    let teacherOption = this.renderTeachers();

    return (
      <div
        className="modal fade"
        id="student-enrolment"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                ENROLMENT
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
              <div className="student-subject mb-4">
                <div className="student-subject__label">Select subject:</div>
                <Select
                  options={options}
                  classNamePrefix="select subject"
                  onChange={this.subjectOptionsChangeHandler}
                />
              </div>
              <div className="student-subject">
                <div className="student-subject__label">Select teacher:</div>
                <Select
                  options={teacherOption}
                  onChange={this.teacherOptionsChangeHandler}
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
                className="btn student-enrol"
                onClick={this.enrolStudents}
              >
                Enrol
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
    subjects: state.subject.data,
  };
};

export default connect(mapStateToProps, {
  fetchStudentAssessments,
  fetchStudentAssignments,
  fetchStudentLessons,
})(EnrolStudent);
