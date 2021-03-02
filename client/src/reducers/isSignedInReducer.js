import { IS_SIGNED_IN } from "../actions/types";

const INITIAL_STATE = {
  data: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IS_SIGNED_IN:
      return { ...state, data: action.payload };

    default:
      return state;
  }
};
