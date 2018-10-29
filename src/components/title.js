import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import { black, title as titleColor } from '../colors';

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: titleColor,
    fontFamily: 'Futura-title',
    fontSize: 50,
    textAlign: 'center',
  },
  textLight: {
    color: black,
    fontFamily: 'Futura-heavy',
    fontSize: 35,
    textAlign: 'center',
  },
  icon: {
    marginLeft: 20,
    alignContent: 'center',
    alignItems: 'center',
  },
});

const Icon = ic => <View style={styles.icon}>{ic}</View>;

const Title = ({ title, icon, light }) => (
  <View style={styles.container}>
    <Text style={light ? styles.textLight : styles.text}>{title}</Text>
    {icon ? Icon(icon) : null}
  </View>
);

Title.propTypes = {
  light: PropTypes.bool,
  icon: PropTypes.node,
  title: PropTypes.string,
};

export default Title;
