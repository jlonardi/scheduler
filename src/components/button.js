import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableHighlight } from 'react-native';
import { button } from '../colors';

const styles = {
  container: {
    height: 50,
    minWidth: 200,
    elevation: 5,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
    paddingLeft: 25,
    paddingRight: 25,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Futura-heavy',
  },
};

const Btn = ({ title, onPress, disabled = false }) => (
  <TouchableHighlight onPress={disabled ? undefined : onPress} style={{ ...styles.container, backgroundColor: disabled ? 'lightgray' : button }}>
    <Text style={styles.text}>{title.toUpperCase()}</Text>
  </TouchableHighlight>
);

Btn.propTypes = {
  title: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

export default Btn;
