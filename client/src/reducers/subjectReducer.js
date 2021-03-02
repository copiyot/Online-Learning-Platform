import {
  CREATE_SUBJECT,
  FETCH_SUBJECTS,
  FETCH_TEACHER_SELECTED_SUBJECTS,
} from "../actions/types";

let INITIAL_STATE = { data: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_SUBJECT:
      return { ...state, isCreated: action.payload };

    case FETCH_SUBJECTS:
      return { ...state, data: action.payload };

    case FETCH_TEACHER_SELECTED_SUBJECTS:
      return { ...state, selectedSubjects: action.payload };

    default:
      return state;
  }
};
