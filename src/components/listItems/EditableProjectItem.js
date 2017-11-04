//Basically InlineTextInput but with redux
//This will be used in ProjectTaskItem and ActiveItem
//(ProjectList and ActiveList)
//import _ from 'lodash';
import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
// import { projectChanged } from '../../actions';


class EditableProjectItem extends Component {
  componentWillMount(text) {
    console.log('in editable component will mount');
    console.log(this.props.project);
    console.log(text);

    console.log(this.props.text);
    console.log(this.props.project);
  }

  render() {
    console.log('in editable list');
    console.log(this.props);
    return (
      <Text style={styles.inputStyle} >{this.props.text}</Text>
    );
  }
}

const styles = {
  inputStyle: {
    flex: 7,
    color: '#000',
    padding: 5,
    paddingLeft: 10,
    fontSize: 18,
    lineHeight: 23,
    height: 35
  }
};

const mapStateToProps = (state, ownProps) => {
  console.log('project mapStateToProps');
  console.log(ownProps);
  const projectNo = ownProps.pid;
  console.log(`projectNo: ${ownProps.pid}`);

  console.log(state.project.Projects);
  console.log(state);
  console.log(state.project);

  if (state.project[projectNo] === undefined) {
    const text = ownProps.project;
    console.log('first loop');
    console.log({ text });
    return { text };
  }

  console.log('second loop');
  console.log(state.project[projectNo]);

  const text = state.project[projectNo];
  console.log({ text });
  return { text };
};

export default connect(mapStateToProps)(EditableProjectItem);
