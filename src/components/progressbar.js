import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

const styles = {
  container: {
    height: 50,
    backgroundColor: 'lightgray',
    justifyContent: 'flex-start',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 3,
    overflow: 'hidden',
  },
  text: {
    position: 'absolute',
    color: 'white',
    fontSize: 15,
    top: 15,
    left: 30,
    zIndex: 3,
    fontFamily: 'Futura-heavy',
  },
};

const ProgressBar = ({ progress, label, color = 'red' }) => {
  const barStyles = {
    width: `${parseInt(progress * 100)}%`,
    backgroundColor: color,
    height: '100%',
    borderRadius: 3,
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <View style={barStyles} />
    </View>
  );
};

ProgressBar.propTypes = {
  color: PropTypes.number,
  progress: PropTypes.number,
  label: PropTypes.string,
};

export default ProgressBar;
