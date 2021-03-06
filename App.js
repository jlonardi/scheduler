import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Font } from 'expo';
import { createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import NavigatorService from './src/services/navigator';
import AddTask from './src/scenes/addTask';
import TaskOverview from './src/scenes/taskOverview';
import ListView from './src/scenes/list';
import createStore from './src/store';
import { loadTasks, updateTaskConsume } from './src/actions';

const RootStack = createStackNavigator(
  {
    AddTask,
    ListView,
    TaskOverview,
  },
  {
    initialRouteName: 'ListView',
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'white',
      },
      headerBackTitleStyle: { color: 'black' },
      headerTitleStyle: { color: 'black' },
    },
  },
);

const store = createStore();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      storeLoaded: false,
    };
  }

  componentDidMount() {
    this.loadStore();
    this.loadFonts();
  }

  loadFonts = () => {
    Font.loadAsync({
      Archive: require('./assets/fonts/Archive.otf'),
      Guthen: require('./assets/fonts/Guthen.ttf'),
      'Futura-heavy': require('./assets/fonts/Futura_heavy.ttf'),
      'Futura-title': require('./assets/fonts/Futura_title.ttf'),
      'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
    })
      .then(() => this.setState({ fontsLoaded: true }))
      .catch((err) => {
        console.log('error when loading store data');
        console.log(err);
      });
  }

  loadStore = async () => {
    try {
      const res = await AsyncStorage.getItem('task_list');

      const saved = JSON.parse(res) || {};
      const tasks = saved.tasks || [];
      const timestamp = saved.timestamp || new Date().getTime();
      const saveDate = new Date(timestamp);
      const today = new Date();
      const timeDiff = Math.abs(saveDate.getTime() - today.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const shouldReset = (saveDate.getDay() !== 0 && today.getDay() < saveDate.getDay()) // if today is not sunday and the save date was a weekday after this day
                          || (saveDate.getDay() === 0 && today.getDay() !== 0) // was saved sunday and today is any other day
                          || diffDays > 6; // or over a week has pasesed
      const tasksToLoad = shouldReset ? tasks.map(task => ({ ...task, consumed: 0 })) : tasks;
      console.log(tasksToLoad); // debug stuff
      store.dispatch(loadTasks(tasksToLoad));
      this.setState({ storeLoaded: true });
    } catch (err) {
      console.log('error when loading store data');
      console.log(err);
    }

    try {
      const saved = await AsyncStorage.getItem('saved_timer');
      if (saved) {
        const { id, timestamp } = JSON.parse(saved);
        const { consumed } = store.getState().tasks.find(task => task.id === id);
        const delta = new Date().getTime() - timestamp;
        const updatedConsumed = consumed + delta;

        store.dispatch(updateTaskConsume(updatedConsumed, id));

        await AsyncStorage.removeItem('saved_timer');

        NavigatorService.navigate('TaskOverview', { resume: true, id });
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { fontsLoaded, storeLoaded } = this.state;
    if (!fontsLoaded || !storeLoaded) return null;

    return (
      <Provider store={store}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <RootStack
            ref={(navigatorRef) => {
              NavigatorService.setContainer(navigatorRef);
            }}
          />
        </View>
      </Provider>
    );
  }
}

export default App;
