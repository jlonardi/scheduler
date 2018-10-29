import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { palette } from '../colors';

const styles = {
  container: {
    height: 50,
    backgroundColor: 'lightgray',
    justifyContent: 'flex-start',
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 5,
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
    width: `${progress * 100}%`,
    backgroundColor: palette[color] || color,
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
  color: PropTypes.string,
  progress: PropTypes.number,
  label: PropTypes.string,
};

export default ProgressBar;
