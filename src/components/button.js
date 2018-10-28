import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, View, Button } from 'react-native';

const styles = {
  buttonWrapper: { marginLeft: 30, marginRight: 30, elevation: 5 },
};

const Btn = ({ onPress }) => (
  <TouchableHighlight style={styles.buttonWrapper}>
    <View style={{ height: 50 }}>
      <Button title="Add" onPress={onPress} color="#6699ff" />
    </View>
  </TouchableHighlight>
);

Btn.propTypes = {
  onPress: PropTypes.func,
};

export default Btn;
