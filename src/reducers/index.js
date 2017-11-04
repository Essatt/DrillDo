import { combineReducers } from 'redux';
import ActiveTaskReducer from './ActiveTaskReducer';
import AllDataReducer from './AllDataReducer';
import NewTaskReducer from './NewTaskReducer';
import ProjectReducer from './ProjectReducer';

export default combineReducers({
  activeTask: ActiveTaskReducer,
  allData: AllDataReducer,
  newTask: NewTaskReducer,
  project: ProjectReducer,
});

//import ProjectReducer from './ProjectReducer';
//import ProjectTaskReducer from './ProjectTaskReducer';
//import ProjectFormReducer from './ProjectFormReducer';

//project: ProjectReducer,
//projectTask: ProjectTaskReducer,
//projectForm: ProjectFormReducer,
