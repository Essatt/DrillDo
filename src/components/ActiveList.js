//Will show active tasks. Will be made out of ActiveTasks
import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipe-out';

import ActiveItem from './listItems/ActiveItem';
import NewTask from './listItems/NewTask';
import { activeListFetch, updateToDo, addTodo, deleteTodo, toggleTodo } from '../actions';

class ActiveList extends Component {
  // Initialize the hardcoded data
  componentWillMount() {
    const preData2 =
    {
      Projects: {
        P1: {
          name: 'Renovizations',
          color: 'red',
          symbol: 'R',
          pid: 'P1',
          Tasks: {
            P1T1: {
              tid: 'P1T1',
              text: 'Do stuff',
              dependencies: [],
              dependentOn: [],
              status: 'Active'
            },
            P5T1: {
              tid: 'P5T1',
              text: 'Testing Stuff',
              dependencies: [],
              dependentOn: [],
              status: 'Active'
            },
            P5T9: {
              tid: 'task_1',
              text: 'ariana',
              dependencies: [],
              dependentOn: [],
              status: 'Active'
            }
          }
        },
        P2: {
          name: 'Chores',
          color: 'green',
          symbol: 'C',
          pid: 'P2',
          Tasks: {
            P2T1: {
              tid: 'P2T1',
              text: 'Do more stuff',
              dependencies: ['P2T2'],
              dependentOn: [],
              status: 'Active'
            },
            P2T2: {
              tid: 'P2T2',
              text: 'yooo',
              dependencies: [],
              dependentOn: ['P2T1'],
              status: 'Pending'
            }
          }
        }
      }
    };

    // AsyncStorage.getItem('DrillDo', (err, result) => {
    //   console.log('initial list from storage');
    //   console.log(result);
    // });

    AsyncStorage.setItem('DrillDo', JSON.stringify(preData2), () => {

    });

    this.props.activeListFetch();
    console.log('component will mount');
    console.log(this.props);

    this.createDataSource(this.props.activeSet);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props
    console.log('component will recieve props');
    console.log(this.props);
    console.log(nextProps);

    this.createDataSource(nextProps.activeSet);
  }

  createDataSource(data = []) {
    console.log('create data source');
    console.log(data);
    console.log(this.props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    //Problem is that cloneWithRows expects array of objects
    //employees is just an object. We use lodash library to component
    //with this
    this.dataSource = ds.cloneWithRows(data);
    // console.log(`data source: ${this.dataSource}`);
  }

  updateToDo(tid, text) {
    this.props.updateToDo(this.props.data, tid, text);
  }

  addNewTodo(text, pid) {
    this.props.addTodo(this.props.data, text, pid);
  }

  //write these functions in todoactions
  //write the reducers
  //pass the functions to the components
  deleteTodo(tid, pid) {
    this.props.deleteTodo(this.props.data, tid, pid);
  }
  toggleTodo(tid, pid) {
    this.props.toggleTodo(this.props.data, tid, pid);
  }

  renderRow(task) {
    // Buttons
    console.log('muah');
    console.log(task);
    console.log(task.pid);
    const swipeoutBtnRight = [
      {
        text: 'Delete',
        onPress: this.deleteTodo.bind(this, task.tid, task.pid),
        type: 'delete',
      }
    ];
    const swipeoutBtnLeft = [
      {
        text: 'Complete',
        onPress: this.toggleTodo.bind(this, task.tid, task.pid),
        backgroundColor: 'green',
        color: 'white',
      }
    ];

    return (
      <Swipeout
        right={swipeoutBtnRight}
        left={swipeoutBtnLeft}
        autoClose
      >
        <ActiveItem
          task={task}
          data={this.props.data}
          save={this.updateToDo.bind(this)}
        />
      </Swipeout>
    );
  }

  render() {
    console.log('render');
    console.log(this.props);
    return (
      <View style={{ paddingTop: 63, flex: 1 }}>
        <NewTask
          data={this.props.data}
          add={this.addNewTodo.bind(this)}
        />
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('in active list mapstate to props');
  console.log(state);
  const data = state.allData;
  console.log(data);
  const activeSet = [];

  if (Object.keys(data).length === 0 && data.constructor === Object) {
    return { data };
  }

  console.log('went into loop');
  /*eslint-disable */
  _.forEach(data.Projects, function (value, property) {
    _.forEach(data.Projects[property].Tasks, function (value1, task) {
  /*eslint-enable */
      if (data.Projects[property].Tasks[task].status === 'Active') {
        const obj = data.Projects[property].Tasks[task];
        const name = data.Projects[property].name;
        const color = data.Projects[property].color;
        const symbol = data.Projects[property].symbol;
        const pid = property;
        const pushObj = Object.assign({}, obj, { name }, { color }, { symbol }, { pid });
        activeSet.push(pushObj);
      }
    });
  });
  console.log(activeSet);
  console.log(data);
  const stored = { data, activeSet };
  console.log(stored);
  return stored;
};

export default connect(mapStateToProps,
  { activeListFetch,
    updateToDo,
    addTodo,
    deleteTodo,
    toggleTodo
  })(ActiveList);
