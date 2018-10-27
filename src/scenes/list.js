import React from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { removeTask } from "../actions";
import { msToString } from "../utils/time";

const deleteTask = (id, remove) => {
  Alert.alert("Delete", "Want to delete this task?", [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
    },
    { text: "Delete", onPress: () => remove(id) }
  ]);
};

const List = ({ tasks, navigation, remove }) => (
  <ScrollView>
    {tasks.map(({ name, duration, id, consumed }) => (
      <TouchableOpacity
        onLongPress={() => deleteTask(id, remove)}
        key={id}
        onPress={() => navigation.navigate("TaskOverview", { id })}
        style={{
          backgroundColor: "lightblue",
          marginBottom: 10
        }}
      >
        <Text style={{ textAlign: "center", fontWeight: '800' }}>{name}</Text>
        <Text style={{ textAlign: "center" }}>
          {msToString(duration - consumed)}
        </Text>
      </TouchableOpacity>
    ))}
    <Button title="Add" onPress={() => navigation.navigate("AddTask")} />
  </ScrollView>
);

List.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      duration: PropTypes.number
    })
  ),
  navigation: PropTypes.object // eslint-disable-line
};

function mapStateToProps({ tasks }) {
  return {
    tasks
  };
}

const mapDispathToProps = dispatch => {
  return {
    remove: id => dispatch(removeTask(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(List);
