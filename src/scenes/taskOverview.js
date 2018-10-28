import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
  Dimensions,
  Vibration,
} from 'react-native';
import { msToString } from '../utils/time';
import { updateTaskConsume } from '../actions';
import Layout from '../components/layout';
import ProgressBar from '../components/progressbar';

// const styles = StyleSheet.create({});
const { width } = Dimensions.get('window');

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
    return this.state.playing ? (
      <Button onPress={this.stopTask} title="Stop task" />
    ) : (
      <Button onPress={this.startTask} title="Start task" />
    );
  }

  startTask = () => {
    this.setState({ playing: true });
    let last = new Date().getTime();
    // let passedTimeInMilliseconds = 0;
    this.interval = setInterval(() => {
      const current = new Date().getTime();
      const delta = current - last;
      last = current;
      const updatedConsume = this.props.consumed + delta;

      this.props.update(updatedConsume, this.props.id);
      if (updatedConsume >= this.props.duration) {
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
    const progress = this.props.consumed / this.props.duration;

    return (
      <Layout title={this.props.name}>
        <View>
          <Text style={{ textAlign: 'center' }}>{this.props.name}</Text>
          <Text style={{ textAlign: 'center' }}>{msToString(this.props.duration - this.props.consumed)}</Text>

          {this.props.consumed >= this.props.duration ? (
            <Text>Task Is Completed!</Text>
          ) : (
            this.playbackbutton
          )}

          <ProgressBar progress={progress} label={msToString(this.props.duration - this.props.consumed)} />

          {this.props.consumed >= this.props.duration ? (
            <Button
              title="OK!"
              onPress={() => {
                Vibration.cancel();
                this.props.navigation.navigate('ListView');
              }}
            />
          ) : null}
        </View>
      </Layout>
    );
  }
}

TaskOverview.propTypes = {
  update: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.string,
  duration: PropTypes.number,
  consumed: PropTypes.number,
  navigation: PropTypes.object // eslint-disable-line
};

function mapStateToProps({ tasks }, { navigation }) {
  const id = navigation.getParam('id') || '78944b3c-1492-440f-81f7-e41c42fc369f';
  return { ...(tasks.find(task => task.id === id) || {}) };
}

const mapDispathToProps = dispath => ({
  update: (consumed, id) => dispath(updateTaskConsume(consumed, id)),
});

export default connect(
  mapStateToProps,
  mapDispathToProps,
)(TaskOverview);
