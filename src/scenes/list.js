import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import {
  TouchableOpacity,
  Alert,
  View,
  Image,
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
  list: { marginTop: 20, marginBottom: 10, paddingLeft: 20, paddingRight: 0 },
};

const StarIconDone = () => (
  <View style={{ alignItems: 'center', width: '20%' }}>
    <Image style={{ height: 80, width: 80 }} source={require('../../assets/star.jpg')} />
  </View>
);

const StarIcon = () => (
  <View style={{ alignItems: 'center', width: '20%', justifyContent: 'center' }}>
    <FontAwesome name="star" size={50} color="gray" />
  </View>
);

const List = ({ tasks, navigation, remove }) => (
  <Layout title="Goals">
    <View style={{ paddingRight: 20, paddingLeft: 20, marginTop: 30, width: 200 }}>
      <Btn title="Add new task" onPress={() => navigation.navigate('AddTask')} />
    </View>
    <ScrollView style={styles.list}>
      {tasks.map(({ name, duration, id, consumed, color }) => (
        <View key={id} style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onLongPress={() => deleteTask(id, remove)}
            onPress={() => navigation.navigate('TaskOverview', { id })}
            style={{
              width: '80%',
            }}
          >
            <ProgressBar color={color} label={`${name} ${msToString(duration - consumed)}`} progress={consumed / duration} />
          </TouchableOpacity>
          { consumed >= duration ? StarIconDone() : StarIcon()}
        </View>
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
