//This will be used in the ProjectList as rowItem
//Will include projectSquare and TouchableItem
import React from 'react';
import { Text } from 'react-native';
import ProjectSquare from './ProjectSquare';
//import EditableProjectItem from './EditableProjectItem';
import EmptySquare from './EmptySquare';
import { CardSection } from '../common';

//<EditableProjectItem project={name} pid={pid} data={props.data} save={props.save} />
const ProjectItem = (props) => {
  const { symbol, color, name, pid } = props.project;
  return (
      <CardSection style={styles.containerStyle}>
        <ProjectSquare shortHand={symbol} color={color} />
        <Text style={styles.inputStyle} >{name}</Text>
        <EmptySquare />
      </CardSection>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'flex-start'
  },
  inputStyle: {
    flex: 1,
    color: '#000',
    padding: 5,
    paddingLeft: 10,
    fontSize: 18,
    lineHeight: 23,
    height: 35,
    fontFamily: 'Helvetica'
  }
};

export default ProjectItem;
