import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Font } from 'expo';
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
    })
      .then(() => this.setState({ fontsLoaded: true }))
      .catch((err) => {
        console.log('error when loading store data');
        console.log(err);
      });
  }

  loadStore = () => {
    AsyncStorage.getItem('task_list')
      .then((res) => {
        const saved = JSON.parse(res);
        const tasks = saved.tasks || [];
        const timestamp = saved.timestamp || new Date().getTime();
        const saveDate = new Date(timestamp);
        const today = new Date();
        const timeDiff = Math.abs(saveDate.getTime() - today.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const shouldReset = (saveDate.getDay() === 0 && today.getDay() > 0) // if was saved sunday and today is monday
                            || diffDays > 6; // or over a week has pasesed
        const tasksToLoad = shouldReset ? tasks.map(task => ({ ...task, consumed: 0 })) : tasks;
        console.log(tasksToLoad); // debug stuff
        store.dispatch(loadTasks(tasksToLoad));
        this.setState({ storeLoaded: true });
      })
      .catch((err) => {
        console.log('error when loading store data');
        console.log(err);
      });
  }

  render() {
    const { fontsLoaded, storeLoaded } = this.state;
    if (!fontsLoaded || !storeLoaded) return null;

    return (
      <Provider store={store}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <RootStack />
        </View>
      </Provider>
    );
  }
}

export default App;
