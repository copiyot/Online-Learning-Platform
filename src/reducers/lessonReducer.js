import {
  CREATE_LESSON,
  FETCH_LESSONS,
  START_LESSON,
  FETCH_STUDENT_LESSONS,
} from "../actions/types";

let INITIAL_STATE = { data: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_LESSON:
      return { ...state, isCreated: action.payload };

    case FETCH_LESSONS:
      return { ...state, data: action.payload };

    case START_LESSON:
      return { ...state, isStartLesson: action.payload };

    case FETCH_STUDENT_LESSONS:
      return { ...state, studentLessons: action.payload };

    default:
      return state;
  }
};
