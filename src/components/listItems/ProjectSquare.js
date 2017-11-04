//This is the little square on the left of the listitem in
//ActiveList as well as ProjectList. Will be used in
//ProjectItem and ActiveItem
import React from 'react';
import { View, Text } from 'react-native';

const ProjectSquare = ({ shortHand, color }) => {
  const { containerStyle, textStyle } = styles;

  return (
    <View style={[containerStyle, { backgroundColor: color }]}>
      <Text style={textStyle}>
        {shortHand}
      </Text>
    </View>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: 'purple',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'

  },
  textStyle: {
    textShadowColor: 'black',
    textShadowOffset: ({ width: 0.5, height: 0.5 }),
    textShadowRadius: 1,
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'

  }
};

export default ProjectSquare;
