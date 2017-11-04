//Basically InlineTextInput but with redux
//This will be used in ProjectTaskItem and ActiveItem
//(ProjectList and ActiveList)
//import _ from 'lodash';
import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { connect } from 'react-redux';
import { taskChanged, activeTaskHeightChanged } from '../../actions';


class EditableListItem extends Component {
  componentWillMount() {
    //text was a prop, was removed
    this.props.taskChanged(this.props.task, this.props.tid);
  }

  onTaskChange(text) {
    console.log(text);
    this.props.taskChanged(text, this.props.tid);
  }

  onContentSizeChange(height) {
    // this event fires when the size of the window sipposed to change
    // the very long event... thing is from fb github
    this.props.activeTaskHeightChanged(height.nativeEvent.contentSize.height, this.props.tid);
  }

  onEndEditing() {
    this.props.save(this.props.tid, this.props.text);
  }

  render() {
    console.log('in editable list render');
    console.log(this.props.text);
    console.log(this.props.height);
    return (
      <TextInput
        onChangeText={this.onTaskChange.bind(this)}
        onContentSizeChange={this.onContentSizeChange.bind(this)}
        value={this.props.text}
        style={[styles.inputStyle,
          { height:
            Math.max(35, isNaN(this.props.height) ? -Infinity : this.props.height) }]}
        onEndEditing={this.onEndEditing.bind(this)}
        multiline
      />
    );
  }
}

const styles = {
  inputStyle: {
    flex: 1,
    color: '#000',
    padding: 5,
    paddingTop: 1,
    paddingRight: 0,
    paddingLeft: 10,
    fontSize: 18,
    lineHeight: 23,
    height: 35,
    fontFamily: 'Helvetica'
  }
};

const mapStateToProps = (state, ownProps) => {
  console.log(state.activeTask);
  const taskNo = ownProps.tid;
  let height = 0;

  if (state.activeTask[taskNo] === undefined) {
    const text = ownProps.task;
    height = 0;
    return { text, height };
  }

  const text = state.activeTask[taskNo].text;
  height = state.activeTask[taskNo].height;
  if (height === undefined) {
    height = 0;
  }
  return { text, height };
};

export default connect(mapStateToProps, { taskChanged, activeTaskHeightChanged })(EditableListItem);
