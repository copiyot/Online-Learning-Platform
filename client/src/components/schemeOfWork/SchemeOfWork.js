import React from "react";
import { MDBDataTableV5 } from "mdbreact";
import { connect } from "react-redux";
import Axios from "axios";

import "./SchemeOfWork.css";
import CreateSchemeOfWork from "../createSchemeOfWork/CreateSchemeOfWork";
import CreateSchemeOfWorkFile from "../createSchemeOfWork/CreateSchemeOfWorkFile";
import EditSchemeOfWork from "../editSchemeOfWork/EditSchemeOfWork";
import { BASE_URL } from "../api";
import { fetchSchemeOfWork } from "../../actions";

class SchemeOfWork extends React.Component {
  state = { selectedScheme: null, schemes: [], datatable: "", scheme: "" };

  componentWillMount() {
    this.setState({ schemes: this.props.SchemeOfWork });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ schemes: nextProps.SchemeOfWork });
  }

  renderModal = (scheme) => {
    this.setState({ selectedScheme: scheme });
  };

  updateSchemes = () => {
    this.setState({ schemes: this.props.SchemeOfWork });
  };

  onDeleteClickHandler = async (id) => {
    // this.props.deleteSubTopic(id);
    let data = {
      id: id,
      deactivated_by: localStorage.getItem("username"),
    };

    console.log(JSON.stringify(data));

    const response = await Axios.post(
      BASE_URL + "curriculum/scheme_of_work/deactivate",
      data,
      {
        Headers: {
          "Content-Type": "application/json",
        },
      }
    );

    alert(response.data.message);
    await this.props.fetchSchemeOfWork();
  };

  onEditClickHandler = (scheme) => {
    this.setState({ scheme });
  };

  renderHelper = () => {
    if (this.state.schemes) {
      const data = {
        columns: [
          {
            label: "Scheme",
            field: "scheme",
            width: 200,
            attributes: {
              "aria-controls": "DataTable",
              "aria-label": "Name",
            },
          },
          // {
          //   label: "Grade",
          //   field: "grade",
          //   width: 200,
          // },
          {
            label: "Term",
            field: "term",
            width: 200,
          },
          {
            label: "Subject",
            field: "subject",
            width: 200,
          },
          {
            label: "Date Created",
            field: "created",
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
        rows: this.state.schemes.map((scheme) => {
          return {
            scheme: scheme.description,
            // grade: scheme.grade,
            term: scheme.term,
            subject: scheme.subject,
            created: scheme.dateCreated.substring(
              0,
              scheme.dateCreated.indexOf("T")
            ),
            edit: (
              <button
                type="button"
                className="btn not-submitted__assignments"
                data-toggle="modal"
                data-target="#edit-schemeof__work"
                onClick={() => this.onEditClickHandler(scheme)}
              >
                Edit
                <i className="far fa-edit ml-2"></i>
              </button>
            ),
            delete: (
              <button
                type="button"
                className="btn not-submitted__assignments"
                onClick={() => this.onDeleteClickHandler(scheme.id)}
              >
                Delete
                <i className="fas fa-trash-alt ml-2"></i>
              </button>
            ),
          };
        }),
      };
      return (
        <div className="scheme-of__work">
          <div className="create-scheme mt-5 p-3">
            <div className="schemeOf-work__buttons">
              <button
                type="button"
                id="sidebarCollapse"
                className="new-scheme btn btn-info py-2 mb-3"
                data-toggle="modal"
                data-target="#create-schemeof__work"
              >
                <span>Create new scheme</span>
                <i className="fa fa-plus-circle" aria-hidden="true"></i>
              </button>
              <button
                type="button"
                id="sidebarCollapse"
                className="new-scheme btn btn-info py-2 mb-3"
                data-toggle="modal"
                data-target="#create-schemeOf__workFile"
              >
                <span>Upload New scheme</span>
                <i className="fas fa-file-pdf ml-2"></i>
              </button>
            </div>
            <CreateSchemeOfWork handler={this.updateSchemes} />
            <CreateSchemeOfWorkFile />
            <EditSchemeOfWork
              handler={this.updateSchemes}
              scheme={this.state.scheme}
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
    SchemeOfWork: state.schemeOfWork.data,
  };
};

export default connect(mapStateToProps, { fetchSchemeOfWork })(SchemeOfWork);
