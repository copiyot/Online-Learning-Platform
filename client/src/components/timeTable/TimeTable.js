import React from "react";

import "./TimeTable.css";
import { connect } from "react-redux";

import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  MonthAgenda,
} from "@syncfusion/ej2-react-schedule";

class TimeTable extends React.Component {
  state = { dates: [], lessons: [] };

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ lessons: this.props.lessons });
  };

  onPopupOpen(args) {
    args.cancel = true;
    console.log(args.value);
  }

  render() {
    console.log(this.state.lessons);
    return (
      <div className="time-table">
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
    lessons: state.lessons.data,
  };
};

export default connect(mapStateToProps)(TimeTable);
