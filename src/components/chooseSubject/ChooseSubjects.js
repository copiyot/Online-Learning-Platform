import React from "react";
import { connect } from "react-redux";
import Select from "react-select";

import { updateSubjects, createSubjectByTeacher } from "../../actions";

class ChooseSubject extends React.Component {
  state = { subjects: [], selectedSubjects: [] };

  componentWillMount() {
    this.setState({ subjects: this.props.subjects });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ subjects: nextProps.subjects });
  }

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

  subjectOptionsChangeHandler = (selectedSubjectOption) => {
    this.setState({ selectedSubjects: selectedSubjectOption });
  };

  onSubmitHandler = () => {
    let ids = this.state.selectedSubjects.map((subject) => subject.value);
    let json = {
      username: localStorage.getItem("username"),
      subjectIds: ids,
    };

    this.props.createSubjectByTeacher(json);
  };

  render() {
    let options = this.renderSubjects();

    return (
      <div
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        id="choose-subject"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                CHOOSE YOUR SUBJECTS
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
              <Select
                options={options}
                classNamePrefix="select subject"
                isMulti
                onChange={this.subjectOptionsChangeHandler}
              />
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
                className="btn btn-primary save-subject"
                onClick={() => this.onSubmitHandler()}
              >
                Save changes
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
  updateSubjects,
  createSubjectByTeacher,
})(ChooseSubject);
