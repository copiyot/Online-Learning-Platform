import { combineReducers } from "redux";

import lessonReducer from "./lessonReducer";
import schemeOfWorkItemsReducer from "./schemeOfWorkItemsReducer";
import schemeOfWorkReducer from "./schemeOfWorkReducer";
import subjectReducer from "./subjectReducer";
import topicReducer from "./topicReducer";
import subTopicReducer from "./subTopicReducer";
import assignmentReducer from "./assignmentReducer";
import isSignedInReducer from "./isSignedInReducer";

export default combineReducers({
  lessons: lessonReducer,
  schemeOfWorkItems: schemeOfWorkItemsReducer,
  schemeOfWork: schemeOfWorkReducer,
  subject: subjectReducer,
  topic: topicReducer,
  subTopic: subTopicReducer,
  assignment: assignmentReducer,
  isSignedIn: isSignedInReducer,
});
