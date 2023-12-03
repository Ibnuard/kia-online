import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Scaler} from '../styles';

const Gap = ({height}) => {
  return <View style={{height: Scaler.scaleSize(height)}} />;
};

export default Gap;
