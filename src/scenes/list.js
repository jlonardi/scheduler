import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { removeTask } from '../actions';
import { msToString } from '../utils/time';
import Layout from '../components/layout';
import ProgressBar from '../components/progressbar';

const deleteTask = (id, remove) => {
  Alert.alert('Delete', 'Want to delete this task?', [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    { text: 'Delete', onPress: () => remove(id) },
  ]);
};

const List = ({ tasks, navigation, remove }) => (
  <Layout title="Weekly goals">
    <ScrollView>
      {tasks.map(({ name, duration, id, consumed }) => (
        <TouchableOpacity
          onLongPress={() => deleteTask(id, remove)}
          key={id}
          onPress={() => navigation.navigate('TaskOverview', { id })}
          style={{
            marginBottom: 5,
          }}
        >
          <ProgressBar label={`${name} ${msToString(duration - consumed)}`} progress={consumed / duration} />
        </TouchableOpacity>
      ))}
      <Button title="Add" onPress={() => navigation.navigate('AddTask')} />
    </ScrollView>
  </Layout>
);

List.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    duration: PropTypes.number,
  })),
  remove: PropTypes.func,
  navigation: PropTypes.object // eslint-disable-line
};

function mapStateToProps({ tasks }) {
  return {
    tasks,
  };
}

const mapDispathToProps = dispatch => ({
  remove: id => dispatch(removeTask(id)),
});

export default connect(
  mapStateToProps,
  mapDispathToProps,
)(List);
