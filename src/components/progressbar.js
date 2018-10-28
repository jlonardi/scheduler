import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 30,
    backgroundColor: 'lightgray',
    justifyContent: 'flex-start',
  },
  bar: {
    backgroundColor: 'blue',
  },
});
// transform: [{ scaleX: progress + 0.1 }, { translateX: 500 }]
const ProgressBar = ({ progress, label }) => (
  <View style={styles.container}>
    <View style={{ flex: 1, backgroundColor: 'blue', width: `${progress * 100}%` }}>
      <Text>{label}</Text>
    </View>
  </View>
);

ProgressBar.propTypes = {
  progress: PropTypes.number,
  label: PropTypes.string,
};

export default ProgressBar;
