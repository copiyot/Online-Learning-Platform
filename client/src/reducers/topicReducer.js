import { FETCH_TOPIC } from "../actions/types";

let INITIAL_STATE = { data: [], updateTopic: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TOPIC:
      return { ...state, data: action.payload };

    default:
      return state;
  }
};
