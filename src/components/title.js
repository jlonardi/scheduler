import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../colors';

const styles = StyleSheet.create({
  container: {
    height: 200,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.black,
    fontFamily: 'Guthen',
    fontSize: 70,
    letterSpacing: 7,
    textAlign: 'center',
  },
  icon: {
    marginLeft: 20,
    alignContent: 'center',
    alignItems: 'center',
  },
});

const Icon = ic => <View style={styles.icon}>{ic}</View>;

const Title = ({ title, icon }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{title}</Text>
    {icon ? Icon(icon) : null}
  </View>
);

Title.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
};

export default Title;
