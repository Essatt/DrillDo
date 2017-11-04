import { AsyncStorage } from 'react-native';
import _ from 'lodash';

import {
  TASK_CHANGED,
  DATA_FETCH_SUCCESS,
  ADD_TODO_SUCCESS,
  TYPING_NEW_TODO,
  HEIGHT_CHANGED,
  ACTIVE_TASK_ADDED
} from './types';

export const taskChanged = (text, tid) => ({
  type: TASK_CHANGED,
  payload: text,
  id: tid
});

export const activeTaskHeightChanged = (height, tid) => ({
  type: HEIGHT_CHANGED,
  payload: height,
  id: tid
});

export const typingNewTodo = (text) => ({
  type: TYPING_NEW_TODO,
  payload: text
});

export const updateToDo = (oldData, tid, text) => {
  console.log('save changes');
  return (dispatch) => {
    console.log('testing dispatch');
    const newData = { ...oldData };

    /*eslint-disable */
    _.forEach(newData.Projects, function (value, property) {
      _.forEach(newData.Projects[property].Tasks, function (value1, task) {
    /*eslint-enable */
        if (newData.Projects[property].Tasks[task].tid === tid) {
          if (newData.Projects[property].Tasks[task].text !== text) {
            newData.Projects[property].Tasks[task].text = text;
            AsyncStorage.setItem('DrillDo', JSON.stringify(newData), () => {
              dispatch({ type: DATA_FETCH_SUCCESS, payload: newData });
              console.log('change saved to the local storage');
            });
          }
        }
      });
    });
  };
};

export const addTodo = (oldData, text, pid) => {
  console.log('addTodo in actions is running');
  const newData = { ...oldData };
  const newTaskID = _.uniqueId('task_');

  newData.Projects[pid].Tasks[newTaskID] = {};
  newData.Projects[pid].Tasks[newTaskID].text = text;
  newData.Projects[pid].Tasks[newTaskID].tid = newTaskID;
  newData.Projects[pid].Tasks[newTaskID].status = 'Active';
  newData.Projects[pid].Tasks[newTaskID].dependencies = [];
  newData.Projects[pid].Tasks[newTaskID].dependentOn = [];

  console.log(newData);

  return (dispatch) => {
    console.log('in the dispatch for the to phone');
    AsyncStorage.setItem('DrillDo', JSON.stringify(newData), () => {
      console.log('dispatching ADD_TODO_SUCCESS');
      dispatch({ type: ADD_TODO_SUCCESS, payload: 'success' });
      console.log('dispatching ACTIVE_LIST_FETCH_SUCCESS');
      dispatch({ type: DATA_FETCH_SUCCESS, payload: newData });
      console.log('added data in the action creator');
      dispatch({ type: ACTIVE_TASK_ADDED, payload: text, id: newTaskID });
      console.log(newData);
    });
  };
};

export const activeListFetch = () => {
  return (dispatch) => {
    AsyncStorage.getItem('DrillDo', (err, result) => {
      console.log(`error in activelistfetch ${err}`);
      console.log(`result of activelistfetch ${result}`);
      const returnSet = JSON.parse(result);
      dispatch({ type: DATA_FETCH_SUCCESS, payload: returnSet });
      console.log('dispatched the action');
    });
  };
};

export const deleteTodo = (oldData, tid, pid) => {
  const newData = { ...oldData };
  console.log(pid);
  console.log(newData);
  //check if the task being deleted depends on any task
  let dependsOn;
  if (newData.Projects[pid].Tasks[tid].dependentOn.length === 0) {
    dependsOn = false;
  } else {
    dependsOn = true;
  }

  // go through all the dependencies.
  for (let i = 0; i < newData.Projects[pid].Tasks[tid].dependencies.length; i++) {
    const taskNo = newData.Projects[pid].Tasks[tid].dependencies[i];
    // Update their status to active if the task being deleted was an activeTask.
    if (newData.Projects[pid].Tasks[tid].status === 'Active') {
      newData.Projects[pid].Tasks[taskNo].status = 'Active';
    }
    // Update their dependsOn field with the taks being deleted's dependentOn field
    if (dependsOn) {
      newData.Projects[pid].Tasks[taskNo].dependentOn =
          newData.Projects[pid].Tasks[tid].dependentOn.slice();

      // Update the parentTask's dependencies field
      for (let j = 0; j < newData.Projects[pid].Tasks[tid].dependentOn.length; j++) {
        const parentTask = newData.Projects[pid].Tasks[tid].dependentOn[j];
        newData.Projects[pid].Tasks[parentTask].push(taskNo);
      }
    } else {
      console.log(newData);
      console.log(taskNo);
      console.log(pid);
      newData.Projects[pid].Tasks[taskNo].dependentOn = [];
    }
  }

  delete newData.Projects[pid].Tasks[tid];

  return (dispatch) => {
    console.log('in the dispatch for deleting todo');
    AsyncStorage.setItem('DrillDo', JSON.stringify(newData), () => {
      console.log('dispatching ACTIVE_LIST_FETCH_SUCCESS');
      dispatch({ type: DATA_FETCH_SUCCESS, payload: newData });
      console.log(`added data in the action creator ${newData}`);
      console.log(newData);
    });
  };
};

export const toggleTodo = (oldData, tid, pid) => {
  const newData = { ...oldData };
  // Mark the task as completed
  console.log(tid);
  console.log(pid);
  console.log(newData);
  if (newData.Projects[pid].Tasks[tid].status === 'Active') {
    newData.Projects[pid].Tasks[tid].status = 'Completed';
    // Mark all the todos that depends on the tasks active
    for (let i = 0; i < newData.Projects[pid].Tasks[tid].dependencies.length; i++) {
      const taskNo = newData.Projects[pid].Tasks[tid].dependencies[i];
      newData.Projects[pid].Tasks[taskNo].status = 'Active';
    }
    //Mark the task as active once again
  } else if (newData.Projects[pid].Tasks[tid].status === 'Completed') {
    newData.Projects[pid].Tasks[tid].status = 'Active';
    // Mark all the todos that depends on the tasks
    //which are currently active, as pending
    for (let i = 0; i < newData.Projects[pid].Tasks[tid].dependencies.length; i++) {
      const taskNo = newData.Projects[pid].Tasks[tid].dependencies[i];
      if (newData.Projects[pid].Tasks[taskNo].status === 'Active') {
        newData.Projects[pid].Tasks[taskNo].status = 'Pending';
      }
    }
  } else {
    console.log('error in Toggle todo');
  }
  return (dispatch) => {
    console.log('in the dispatch for toggle todo');
    AsyncStorage.setItem('DrillDo', JSON.stringify(newData), () => {
      console.log('dispatching ACTIVE_LIST_FETCH_SUCCESS');
      dispatch({ type: DATA_FETCH_SUCCESS, payload: newData });
      console.log(`added data in the action creator ${newData}`);
    });
  };
};
