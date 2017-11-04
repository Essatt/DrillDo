
//Will show projects. Will be made out of ProjectListItems
import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipe-out';

import ProjectItem from './listItems/ProjectItem';
import NewTask from './listItems/NewTask';
import { activeListFetch, deleteProject } from '../actions';

class ProjectList extends Component {

  componentWillMount() {
    AsyncStorage.getItem('DrillDo', (err, result) => {
      console.log('initial list from storage');
      console.log(result);
    });

    this.props.activeListFetch();
    console.log('componen will mount');
    console.log(this.props);

    this.createDataSource(this.props.projectSet);
  }

  componentWillReceiveProps(nextProps) {
    //nextProps are the next set of props that this component
    //will be rendered with
    //this.props is still the old set of props
    console.log('component will recieve props');
    console.log(this.props);
    console.log(nextProps);

    this.createDataSource(nextProps.projectSet);
  }

  createDataSource(data = []) {
    console.log('create data source');
    console.log(data);
    console.log(this.props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(data);
    console.log(`data source: ${this.dataSource}`);
  }

  deleteProject(pid) {
    this.props.deleteProject(this.props.data, pid);
  }

  renderRow(project) {
    // Buttons
    const swipeoutBtnRight = [
      {
        text: 'Delete',
        onPress: this.deleteProject.bind(this, project.pid),
        type: 'delete',
      }
    ];
    console.log(project);
    return (

      <Swipeout
        right={swipeoutBtnRight}
        autoClose
      >
        <ProjectItem
          project={project}
          data={this.props.data}
        />
      </Swipeout>

    );
  }

  render() {
    console.log('render');
    console.log(this.props);
    return (
      <View style={{ paddingTop: 63 }}>
        <NewTask
          data={this.props.data}
          //add={this.addNewTodo.bind(this)}
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
  const projectSet = [];

  // if (Object.keys(data).length === 0 && data.constructor === Object) {
  //   return { data };
  // }

  console.log('went into loop');
  /*eslint-disable */
  _.forEach(data.Projects, function (value, property) {
/*eslint-enable */
    const obj = data.Projects[property];
    const name = data.Projects[property].name;
    const color = data.Projects[property].color;
    const symbol = data.Projects[property].symbol;
    const pid = data.Projects[property].pid;
    const pushObj = Object.assign({}, obj, { name }, { color }, { symbol }, { pid });
    projectSet.push(pushObj);
  });
  console.log(projectSet);
  console.log(data);
  const stored = { data, projectSet };
  console.log(stored);
  return stored;
};

export default connect(mapStateToProps,
  { activeListFetch,
    deleteProject
  })(ProjectList);
