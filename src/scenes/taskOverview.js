import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
  Vibration,
} from 'react-native';
import { msToString } from '../utils/time';
import { updateTaskConsume } from '../actions';
import Layout from '../components/layout';
import ProgressBar from '../components/progressbar';


class TaskOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
    };
  }

  componentWillUnmount() {
    this.stopTask();
  }

  get playbackbutton() {
    const { playing } = this.state;
    return playing ? (
      <Button onPress={this.stopTask} title="Stop task" />
    ) : (
      <Button onPress={this.startTask} title="Start task" />
    );
  }

  startTask = () => {
    this.setState({ playing: true });
    let last = new Date().getTime();

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
    clearInterval(this.interval);
    this.setState({ playing: false });
  };

  taskReady = () => {
    this.stopTask();
    const pattern = [400, 1000, 400, 1000, 0];
    Vibration.vibrate(pattern, true);
    // Something!
  };

  render() {
    const { color, consumed, duration, name, navigation } = this.props;
    const progress = consumed / duration;
    const finished = consumed >= duration;
    return (
      <Layout title={name}>
        <View>
          {finished ? <Text>Task Is Completed!</Text> : this.playbackbutton }

          <ProgressBar color={color} progress={progress} label={msToString(duration - consumed)} />

          { finished
            ? (
              <Button
                title="DONE!"
                onPress={() => {
                  Vibration.cancel();
                  navigation.navigate('ListView');
                }}
              />)
            : null
            }
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
