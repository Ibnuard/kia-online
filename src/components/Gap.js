import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Scaler} from '../styles';

const Gap = ({height, width}) => {
  return (
    <View
      style={{
        height: Scaler.scaleSize(height || 0),
        width: Scaler.scaleSize(width || 0),
      }}
    />
  );
};

export default Gap;
