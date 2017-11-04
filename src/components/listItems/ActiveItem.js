//This will be the rowItem for ActiveList.It will have
//EditableListItem and ProjectSquare

import React from 'react';
import ProjectSquare from './ProjectSquare';
import EditableListItem from './EditableListItem';
import EmptySquare from './EmptySquare';
import { CardSection } from '../common';


const ActiveItem = (props) => {
  console.log('in active item');
  console.log(props);
  const { symbol, color, text, tid } = props.task;
  console.log(text);
  console.log(tid);
  //console.log(props.save);
  return (

    <CardSection style={styles.containerStyle}>
      <ProjectSquare shortHand={symbol} color={color} />
      <EditableListItem task={text} tid={tid} data={props.data} save={props.save} />
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
  }
};

export default ActiveItem;
