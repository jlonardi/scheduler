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
    const { hours, minutes, name } = this.state;
    const { store } = this.context;
    const { navigation } = this.props;

    const h = parseInt(hours || 0, 10);
    const m = parseInt(minutes || 0, 10);
    const newTask = {
      name,
      duration: timeToMs(h, m),
    };

    store.dispatch(addTask(newTask));
    navigation.navigate('ListView');
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
      <Layout title="Add new" icon={<MaterialIcons name="stars" size={50} color="lightgray" />}>
        <View>
          <Text>Activity:</Text>
          <TextInput
            onChangeText={this.OnNameChange}
            value={name}
          />

          <Text>Hours:</Text>
          <TextInput
            keyboardType="numeric"
            value={hours}
            onChangeText={this.OnHourChange}
          />

          <Text>Minutes:</Text>
          <TextInput
            keyboardType="numeric"
            value={minutes}
            onChangeText={this.OnMinutesChange}
          />

          <Button disabled={!enabled} onPress={this.AddTaskToList} title="Add activity" />
        </View>
      </Layout>
    );
  }
}

AddTask.contextTypes = {
  store: PropTypes.object, // eslint-disable-line
};

AddTask.propTypes = {
  navigation: PropTypes.object // eslint-disable-line
};

export default AddTask;
