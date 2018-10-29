import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import {
  Text,
  View,
  AppState,
  TouchableOpacity,
  Image,
  AsyncStorage,
  Vibration,
} from 'react-native';
import { msToString } from '../utils/time';
import { updateTaskConsume } from '../actions';
import Layout from '../components/layout';
import ProgressBar from '../components/progressbar';
import Btn from '../components/button';
import { black } from '../colors';

const styles = {
  container: {
    marginLeft: 20,
    marginRight: 20,
  },
  buttonContainer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonFrame: {
    height: 80,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 3,
    borderRadius: 5,
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 20,
    color: black,
    fontFamily: 'Futura-heavy',
  },
};

class TaskOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const resume = navigation.getParam('resume');
    if (resume) {
      this.startTask();
    }

    AppState.addEventListener('change', async (state) => {
      const { playing } = this.state;
      if (state === 'active') {
        const saved = await AsyncStorage.getItem('saved_timer');
        console.log(saved);
        if (saved) {
          const { update, consumed } = this.props;
          const { id, timestamp } = JSON.parse(saved);
          const delta = new Date().getTime() - timestamp;
          const updatedConsumed = consumed + delta;

          await AsyncStorage.removeItem('saved_timer');

          update(updatedConsumed, id);
          this.startTask();
        }
      }

      if (state === 'background') {
        if (playing) {
          const { id } = this.props;

          await AsyncStorage.setItem('saved_timer', JSON.stringify({
            id,
            timestamp: new Date().getTime(),
          }));


          this.stopTask();
        }
      }
    });
  }

  componentWillUnmount() {
    this.stopTask();
  }

  get finishedView() {
    const { navigation } = this.props;
    return (
      <View>
        <View style={{ height: 50, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={styles.text}>Task Is Completed!</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Image style={styles.image} source={require('../../assets/star_small.png')} />
        </View>
        <Btn
          title="Task Completed!"
          onPress={() => {
            Vibration.cancel();
            navigation.navigate('ListView');
          }}
        />
      </View>

    );
  }

  get playbackbutton() {
    const { playing } = this.state;
    return playing ? (
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonFrame} onPress={this.stopTask}>
          <Ionicons name="ios-pause" size={50} color="gray" />
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonFrame} onPress={this.startTask}>
          <Ionicons style={{ marginLeft: 5 }} name="ios-play" size={50} color="gray" />
        </TouchableOpacity>
      </View>
    );
  }

  startTask = () => {
    this.setState({ playing: true });
    let last = new Date().getTime();
    console.log('start task');
    this.interval = setInterval(() => {
      const { consumed, duration, id, update } = this.props;
      const current = new Date().getTime();
      const delta = current - last;

      last = current;

      const updatedConsume = consumed + delta;


      update(updatedConsume, id);
      if (updatedConsume >= duration) {
        this.taskReady();
      }
    }, 1000);
  };

  stopTask = () => {
    console.log('task stopped');
    clearInterval(this.interval);
    this.setState({ playing: false });
  };

  taskReady = () => {
    this.stopTask();
    const pattern = [400, 1000, 400, 1000];
    Vibration.vibrate(pattern, true);
    // Something!
  };

  render() {
    const { color, consumed, duration, name } = this.props;
    const progress = consumed / duration;
    const finished = consumed >= duration;
    return (
      <Layout title={name} light>
        <View style={styles.container}>
          <ProgressBar color={color} progress={progress} label={msToString(duration - consumed)} />
          {finished ? this.finishedView : this.playbackbutton }
        </View>
      </Layout>
    );
  }
}

TaskOverview.propTypes = {
  update: PropTypes.func,
  name: PropTypes.string,
  color: PropTypes.string,
  id: PropTypes.string,
  duration: PropTypes.number,
  consumed: PropTypes.number,
  navigation: PropTypes.object // eslint-disable-line
};

function mapStateToProps({ tasks }, { navigation }) {
  const id = navigation.getParam('id');
  const task = { ...(tasks.find(t => t.id === id) || {}) };
  return task;
}

const mapDispathToProps = dispath => ({
  update: (consumed, id) => dispath(updateTaskConsume(consumed, id)),
});

export default connect(
  mapStateToProps,
  mapDispathToProps,
)(TaskOverview);
