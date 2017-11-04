import {
  PROJECT_CHANGED
  //DELETE_TASK,
  //TOGGLE_TASK,
} from '../actions/types';

const INITIAL_STATE = {
  Projects: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROJECT_CHANGED: {
      return { ...state, [action.id]: action.payload };
    }
    default:
      return state;

  }
};
