import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Size} from '../styles';
import {ImunisasiCard} from '../components';
import {useNavigation} from '@react-navigation/native';

const RegisteredImunScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImunisasiCard
        onRegsiterPress={() => navigation.navigate('DaftarImunisasi')}
      />
    </View>
  );
};

export default RegisteredImunScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Size.SIZE_24,
  },
});
