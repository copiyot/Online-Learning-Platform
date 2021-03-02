import {
  FETCH_ASSIGNMENT,
  FETCH_ASSESSMENT,
  FETCH_STUDENT_ASSESSMENT,
  FETCH_STUDENT_ASSIGNMENT,
} from "../actions/types";

let INITIAL_STATE = { data: [], assessment: [], studentAssessment: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ASSIGNMENT:
      return { ...state, data: action.payload };

    case FETCH_ASSESSMENT:
      return { ...state, assessment: action.payload };

    case FETCH_STUDENT_ASSESSMENT:
      return { ...state, studentAssessment: action.payload };

    case FETCH_STUDENT_ASSIGNMENT:
      return { ...state, studentAssignment: action.payload };
    default:
      return state;
  }
};
