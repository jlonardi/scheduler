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
  .then((res) => {
    const saved = JSON.parse(res);
    const tasks = saved.tasks || [];
    const timestamp = saved.timestamp || new Date().getTime();
    const saveDate = new Date(timestamp);
    const today = new Date();
    const timeDiff = Math.abs(saveDate.getTime() - today.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const shouldReset = (saveDate.getDay() === 0 && today.getDay() === 1) // if was saved sunday and today is monday
                        || diffDays > 6; // or over a week has pasesed
    const tasksToLoad = shouldReset ? tasks.map(task => ({ ...task, consumed: 0 })) : tasks;
    store.dispatch(loadTasks(tasksToLoad));
  });


const App = () => (
  <Provider store={store} >
    <View style={{ flex: 1 }}>
      <RootStack />
    </View>
  </Provider>
);

export default App;
