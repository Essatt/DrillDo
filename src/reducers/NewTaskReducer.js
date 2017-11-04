import {
  ADD_TODO_SUCCESS,
  TYPING_NEW_TODO
} from '../actions/types';

const INITIAL_STATE = {
  text: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TODO_SUCCESS:
      return INITIAL_STATE;
    case TYPING_NEW_TODO:
      return { ...state, text: action.payload };
    default:
      return state;
  }
};
