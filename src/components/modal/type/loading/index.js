import * as React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Colors} from '../../../../styles';
import styles from './styles';

const ModalLoading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={Colors.COLOR_PRIMARY} />
    </View>
  );
};

export default ModalLoading;
