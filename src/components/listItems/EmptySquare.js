import React from 'react';
import { View } from 'react-native';

const EmptySquare = () => {
  const { containerStyle } = styles;

  return (
    <View style={containerStyle} />
  );
};

const styles = {
  containerStyle: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: 10
  },
};

export default EmptySquare;
