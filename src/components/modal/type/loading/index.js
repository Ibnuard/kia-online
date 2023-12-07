import * as React from 'react';
import {ActivityIndicator} from 'react-native';
import {Colors} from '../../../../styles';
import styles from './styles';

const ModalLoading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={Colors.COLOR_ACCENT} />
    </View>
  );
};

export default ModalLoading;
