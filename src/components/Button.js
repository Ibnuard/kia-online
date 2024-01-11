import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import React from 'react';
import {Colors, Scaler} from '../styles';

const CustomButton = props => {
  const {children, style, mode} = props;
  return (
    <Button
      {...props}
      mode={mode || 'contained'}
      compact
      style={[styles.container, style]}>
      {children}
    </Button>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    height: Scaler.scaleSize(48),
    justifyContent: 'center',
  },
});
