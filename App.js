import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import AddTask from './src/scenes/addTask';
import TaskOverview from './src/scenes/taskOverview';
import ListView from './src/scenes/list';
import createStore from './src/store';
import { loadTasks } from './src/actions';

const RootStack = createStackNavigator(
  {
    AddTask,
    ListView,
    TaskOverview
  },
  {
    initialRouteName: 'ListView',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#737373',
      },
      headerTintColor: 'white',
    },
  }
);

const store = createStore();

AsyncStorage.getItem('task_list')
  .then(res => store.dispatch(loadTasks(JSON.parse(res) || [])));


const App = () => (
  <Provider store={store} >
    <View style={{ flex: 1 }}>
      <RootStack />
    </View>
  </Provider>
);

export default App;
