import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from '../common';
import { typingNewTodo, addTodo } from '../../actions';

class NewTask extends Component {

  onEndEditing() {
    console.log(this.props);
    console.log(this.props.data);
    this.props.addTodo(this.props.data, this.props.text, 'P1');
  }

  onTaskChange(text) {
    this.props.typingNewTodo(text);
  }

  render() {
    return (
      <View>
        <CardSection style={styles.containerStyle}>
          <TextInput
            value={this.props.text}
            style={styles.inputStyle}
            placeholder='New Task ...'
            onEndEditing={this.onEndEditing.bind(this)}
            onChangeText={this.onTaskChange.bind(this)}
          />
        </CardSection>
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'left',
    color: '#000',
    padding: 5,
    fontSize: 18,
    lineHeight: 23,
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    borderColor: '#ddd',
    position: 'relative',
    height: 35
  },
  containerStyle: {
    borderTopWidth: 1,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0
  }
};

const mapStateToProps = (state) => {
  let text = state.newTask.text;
  if (state.newTask === undefined) {
    text = '';
  }
  return { text };
};

export default connect(mapStateToProps, { typingNewTodo, addTodo })(NewTask);
