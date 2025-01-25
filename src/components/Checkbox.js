import React from 'react';
import {View, StyleSheet} from 'react-native';

const Checkbox = (props) => {
  const {checkedState} = props

  return (
    <View style={[styles.checkbox, checkedState && styles.checked]}></View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: 'darkgreen',
    borderRadius: 4,
    marginRight: 10,
    backgroundColor: 'white',
  },
  checked: {
    backgroundColor: '#4CAF50',
  },
});

export default Checkbox;
