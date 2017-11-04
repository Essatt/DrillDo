import React, { Component } from 'react';
import { TextInput } from 'react-native';

class AutoExpandingTextInput extends Component {

  constructor(props) {
    super(props);
    this.state = { text: '', height: 0 };
  }
  render() {
    return (
      <TextInput
        {...this.props}
        multiline
        onChange={(event) => {
          this.setState({
            text: event.nativeEvent.text,
            height: event.nativeEvent.contentSize.height,
          });
        }}
        style={{ height: Math.max(35, this.state.height) }}
        value={this.state.text}
      />
    );
  }
}

export { AutoExpandingTextInput };
