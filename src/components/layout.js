import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Title from './title';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const Layout = ({ title, children, icon, light }) => (
  <View style={styles.container}>
    <Title title={title} icon={icon} light={light} />
    <View style={styles.container}>{children}</View>
  </View>
);

Layout.propTypes = {
  light: PropTypes.bool,
  icon: PropTypes.node,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Layout;
