import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, ScrollView, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { addTask } from '../actions';
import { timeToMs } from '../utils/time';
import Layout from '../components/layout';
import Btn from '../components/button';
import { black, palette } from '../colors';

const styles = {
  container: {
    height: 500,
    padding: 50,
  },
  label: {
    paddingLeft: 5,
    color: black,
  },
  input: {
    color: black,
    height: 40,
    paddingBottom: 10,
    paddingHorizontal: 5,
    fontSize: 16,
    marginBottom: 15,
  },
};

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
      <Layout title="Add" icon={<MaterialIcons name="stars" size={50} color="lightgray" />}>
        <ScrollView style={styles.container}>
          <Text style={styles.label}>Activity:</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid={black}
            selectionColor={palette.fifth}
            onChangeText={this.OnNameChange}
            value={name}
          />

          <Text style={styles.label}>Hours:</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid={black}
            selectionColor={palette.fifth}
            keyboardType="numeric"
            value={hours}
            onChangeText={this.OnHourChange}
          />

          <Text style={styles.label}>Minutes:</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid={black}
            selectionColor={palette.fifth}
            keyboardType="numeric"
            value={minutes}
            onChangeText={this.OnMinutesChange}
          />

          <Btn disabled={!enabled} onPress={this.AddTaskToList} title="Add activity" />
        </ScrollView>
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
