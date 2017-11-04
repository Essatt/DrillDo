import {
  TASK_CHANGED,
  HEIGHT_CHANGED,
  ACTIVE_TASK_ADDED
  //DELETE_TASK,
  //TOGGLE_TASK,
} from '../actions/types';

const INITIAL_STATE = {
  // Texts: {},
  // height: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIVE_TASK_ADDED: {
      let returnState = { ...state };
      returnState = { ...state, [action.id]: { text: action.payload, height: 0 } };
      return returnState;
    }
    case TASK_CHANGED: {
      let returnState = { ...state };
      if (state[action.id] === undefined) {
        returnState = { ...state, [action.id]: { text: action.payload, height: 0 } };
      }
      returnState[action.id].text = action.payload;
      return returnState;
    }
    case HEIGHT_CHANGED: {
      const returnState = { ...state };
      returnState[action.id].height = action.payload;
      return returnState;
      }
    default:
      return state;

  }
};
