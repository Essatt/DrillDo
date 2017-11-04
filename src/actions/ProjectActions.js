import { AsyncStorage } from 'react-native';
// import _ from 'lodash';

import {
  //PROJECT_CHANGED,
  DATA_FETCH_SUCCESS,
  // ADD_PROJECT_SUCCESS,
  // TYPING_NEW_PROJECT
} from './types';

export const deleteProject = (oldData, pid) => {
  console.log('in delete project');
  console.log(pid);
  const newData = { ...oldData };
  delete newData.Projects[pid];
  return (dispatch) => {
    console.log('in the dispatch for deleting project');
    AsyncStorage.setItem('DrillDo', JSON.stringify(newData), () => {
      console.log('dispatching DATA_FETCH_SUCCESS');
      dispatch({ type: DATA_FETCH_SUCCESS, payload: newData });
      console.log(`added data in the action creator ${newData}`);
      console.log(newData);
    });
  };
};
