import React from 'react';
import { Text } from 'react-native';
import { Scene, Router, Actions, ActionConst } from 'react-native-router-flux';
import ActiveList from './components/ActiveList';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import ProjectTaskList from './components/ProjectTaskList';

const RouterComponent = () => {
  const TabIcon = ({ selected, title }) => {
    return (
      <Text style={{ color: selected ? 'red' : 'black' }}>{title}</Text>
    );
  };

  return (

    // <Scene key="root">
    //     {/* Tab Container */}
    //     <Scene
    //       key="tabbar"
    //       tabs={true}
    //       tabBarStyle={{ backgroundColor: '#FFFFFF' }}
    //     >
    //       {/* Tab and it's scenes */}
    //       <Scene key="osu" title="OSU" icon={TabIcon}>
    //         <Scene
    //           key="scarlet"
    //           component={ScarletScreen}
    //           title="Scarlet"
    //         />
    //         <Scene
    //           key="gray"
    //           component={GrayScreen}
    //           title="Gray"
    //         />
    //       </Scene>
    //If we add a sceneStyle object ot the router, this will be appplied
    //to all scenes. Think as a global scene variable
    <Router >
      <Scene key="myTabBar" tabs hideNavBar={true} tabBarStyle={styles.tabBarStyle}>
        <Scene
          key="activeTab"
          title="Tasks"
          icon={TabIcon}
          onPress={() => {
            Actions.activeTab({ type: ActionConst.REFRESH });
          }}
        >
          <Scene key="activeList" title="Active Task" component={ActiveList} />
        </Scene>
        <Scene
          key="projectTab"
          title="Projects"
          icon={TabIcon}
          onPress={() => {
            Actions.projectTab({ type: ActionConst.REFRESH });
          }}
        >
          <Scene key="projectList" title="Projects" component={ProjectList} />
        </Scene>
      </Scene>
    </Router>
  );
};

const styles = {
  tabBarStyle: {
    borderTopWidth: 0.5,
    borderColor: '#b7b7b7',
    backgroundColor: 'white',
    opacity: 1
  }
};

export default RouterComponent;
