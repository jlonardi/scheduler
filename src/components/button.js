import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, View, Button } from 'react-native';

const styles = {
  buttonWrapper: { elevation: 3 },
};

const Btn = ({ onPress, disabled = false }) => (
  <TouchableHighlight style={styles.buttonWrapper}>
    <View style={{ height: 50 }}>
      <Button disabled={disabled} title="Add" onPress={onPress} color="#6699ff" />
    </View>
  </TouchableHighlight>
);

Btn.propTypes = {
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

export default Btn;
