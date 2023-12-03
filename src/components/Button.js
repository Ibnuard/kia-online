import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import React from 'react';
import {Scaler} from '../styles';

const CustomButton = ({children, style}) => {
  return (
    <Button mode={'contained'} compact style={[styles.container, style]}>
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
