import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '../styles';
import {Text} from 'react-native-paper';

const EmptyList = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textMessage}>{title || 'Belum ada data'}</Text>
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textMessage: {
    color: Colors.COLOR_GREY,
  },
});
