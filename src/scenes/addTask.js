import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TextInput, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { addTask } from '../actions';
import { timeToMs } from '../utils/time';
import Layout from '../components/layout';

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.OnNameChange = this.OnNameChange.bind(this);
    this.OnHourChange = this.OnHourChange.bind(this);
    this.OnMinutesChange = this.OnMinutesChange.bind(this);
    this.AddTaskToList = this.AddTaskToList.bind(this);

    this.state = {
      name: '',
      hours: '',
      minutes: '',
    };
  }

  AddTaskToList =() => {
    const hours = parseInt(this.state.hours || 0, 10);
    const minutes = parseInt(this.state.minutes || 0, 10);
    const newTask = {
      name: this.state.name,
      duration: timeToMs(hours, minutes),
    };
    this.context.store.dispatch(addTask(newTask));
    this.props.navigation.navigate('ListView');
  }

  OnNameChange=(name) => {
    this.setState({ name });
  }

  OnHourChange=(hours) => {
    this.setState({ hours });
  }

  OnMinutesChange=(minutes) => {
    this.setState({ minutes });
  }

  render() {
    const { name, hours, minutes } = this.state;
    const enabled = (parseInt(hours || 0, 10) + parseInt(minutes || 0, 10)) > 0 && name.length > 0;
    return (
      <Layout title="New goal" icon={<MaterialIcons name="stars" size={50} color="lightgray" />}>
        <View>
          <Text>Activity:</Text>
          <TextInput
            onChangeText={this.OnNameChange}
            value={this.state.text}
          />

          <Text>Hours:</Text>
          <TextInput
            keyboardType="numeric"
            value={this.state.hours}
            onChangeText={this.OnHourChange}
          />

          <Text>Minutes:</Text>
          <TextInput
            keyboardType="numeric"
            value={this.state.minutes}
            onChangeText={this.OnMinutesChange}
          />

          <Button disabled={!enabled} onPress={this.AddTaskToList} title="Add activity" />
        </View>
      </Layout>
    );
  }
}

AddTask.contextTypes = {
  store: PropTypes.object,
};

AddTask.propTypes = {
  navigation: PropTypes.object // eslint-disable-line
};

export default AddTask;
