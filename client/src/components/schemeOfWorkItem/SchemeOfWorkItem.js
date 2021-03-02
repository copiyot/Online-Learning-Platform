import React, { Component } from "react";
import { MDBDataTableV5 } from "mdbreact";
import { connect } from "react-redux";

import "./SchemeOfWorkItem.css";
import CreateSchemeOfWorkItem from "../createSchemeOfWorkItem/CreateSchemeOfWorkItem";
import EditSchemeOfWorkItem from "../editSchemeOfWorkItem/EditSchemeOfWorkItem";
import Axios from "axios";
import { BASE_URL } from "../api";
import { fetchWorkItems } from "../../actions";

class SchemeOfWorkItem extends Component {
  state = {
    selectedSchemeOfworkItem: null,
    schemeOfWorkItems: [],
    datatable: "",
    scheme: "",
  };

  componentWillMount() {
    this.setState({ schemeOfWorkItems: this.props.schemeOfWorkItems });
  }

  renderModal = (schemeOfWorkItem) => {
    this.setState({ selectedSchemeOfworkItem: schemeOfWorkItem });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ schemeOfWorkItems: nextProps.schemeOfWorkItems });
  }

  updateSchemeOfWorkItems = () => {
    this.setState({ schemeOfWorkItems: this.props.schemeOfWorkItems });
  };

  displayData = (schemeOfWorkItem) => {
    return (
      <div
        data-toggle="modal"
        style={{ color: "green" }}
        data-target="#editCustomer"
        onClick={() => this.renderModal(schemeOfWorkItem)}
      >
        view
      </div>
    );
  };

  renderDataTable = () => {
    return (
      <MDBDataTableV5
        hover
        entriesOptions={[5, 20, 25]}
        entries={5}
        pagesAmount={4}
        data={this.state.datatable}
        searchTop
        searchBottom={false}
      />
    );
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

  onEditClickHandler = (scheme) => {
    this.setState({ scheme });
  };

  onDeleteClickHandler = async (id) => {
    let data = {
      id,
      deactivated_by: localStorage.getItem("username"),
    };

    console.log(id);

    const response = await Axios.post(
      BASE_URL + "curriculum/scheme_of_work_item/deactivate",
      data,
      {
        Headers: {
          "Content-Type": "application/json",
        },
      }
    );

    alert(response.data.message);
    await this.props.fetchWorkItems();
  };

  renderHelper = () => {
    if (this.state.schemeOfWorkItems) {
      const data = {
        columns: [
          {
            label: "Week",
            field: "week",
            width: 200,
            attributes: {
              "aria-controls": "DataTable",
              "aria-label": "Name",
            },
          },
          {
            label: "term",
            field: "term",
            width: 200,
          },
          {
            label: "Lesson",
            field: "lesson",
            width: 200,
          },
          {
            label: "Grade",
            field: "grade",
            width: 200,
          },
          {
            label: "Topic",
            field: "topic",
            sort: "asc",
            width: 200,
          },
          {
            label: "Sub Topic",
            field: "subtopic",
            sort: "asc",
            width: 200,
          },
          {
            label: "Objective",
            field: "objective",
            sort: "asc",
            width: 200,
          },
          {
            label: "learing material",
            field: "learningMaterial",
            sort: "asc",
            width: 200,
          },
          {
            label: "Activities",
            field: "activities",
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
            label: "Subject",
            field: "subject",
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
        rows: this.state.schemeOfWorkItems.map((scheme) => {
          return {
            week: scheme.week,
            grade: scheme.grade,
            lesson: scheme.lesson,
            topic: scheme.topic,
            subtopic: scheme.sub_topic,
            objective: this.formatList(scheme.objective),
            learningMaterial: this.formatList(scheme.learning_materials),
            reference: scheme.reference,
            subject: scheme.subject,
            term: scheme.term,
            activities: this.formatList(scheme.activities),
            created: scheme.dateCreated,
            edit: (
              <button
                type="button"
                className="btn not-submitted__assignments"
                data-toggle="modal"
                data-target="#edit-schemeof__workitem"
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
                onClick={() =>
                  this.onDeleteClickHandler(scheme.schem_of_Work_item_id)
                }
              >
                Delete
                <i className="fas fa-trash-alt ml-2"></i>
              </button>
            ),
          };
        }),
      };
      return (
        <div className="scheme-of__workitem">
          <div className="create-schemeof__workitem my-5 p-3">
            <button
              type="button"
              id="sidebarCollapse"
              className="new-scheme btn btn-info py-2 mb-3"
              data-toggle="modal"
              data-target="#create-schemeof__workitem"
            >
              <span>Create new scheme of Work Item</span>
              <i className="fa fa-plus-circle" aria-hidden="true"></i>
            </button>
            <CreateSchemeOfWorkItem handler={this.updateSchemeOfWorkItems} />
            <EditSchemeOfWorkItem
              handler={this.updateSchemeOfWorkItems}
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
              style={{ width: "1000px" }}
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
    schemeOfWorkItems: state.schemeOfWorkItems.data,
  };
};

export default connect(mapStateToProps, { fetchWorkItems })(SchemeOfWorkItem);
