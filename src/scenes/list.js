import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  Alert,
  View,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { removeTask } from '../actions';
import { msToString } from '../utils/time';
import Layout from '../components/layout';
import ProgressBar from '../components/progressbar';
import Btn from '../components/button';

const deleteTask = (id, remove) => {
  Alert.alert('Delete', 'Want to delete this task?', [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    { text: 'Delete', onPress: () => remove(id) },
  ]);
};

const styles = {
  list: { marginTop: 20, marginBottom: 10, paddingLeft: 30, paddingRight: 30 },
};


const List = ({ tasks, navigation, remove }) => (
  <Layout title="Goals">
    <View style={{ paddingRight: 30, paddingLeft: 30 }}>
      <Btn title="Add" onPress={() => navigation.navigate('AddTask')} />
    </View>
    <ScrollView style={styles.list}>
      {tasks.map(({ name, duration, id, consumed, color }) => (
        <TouchableOpacity
          onLongPress={() => deleteTask(id, remove)}
          key={id}
          onPress={() => navigation.navigate('TaskOverview', { id })}
          style={{
            marginBottom: 5,
          }}
        >
          <ProgressBar color={color} label={`${name} ${msToString(duration - consumed)}`} progress={consumed / duration} />
        </TouchableOpacity>
      ))}
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
