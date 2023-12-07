import {StyleSheet, View} from 'react-native';
import React from 'react';
import AppBar from '../components/AppBar';
import {Colors, Size} from '../styles';
import {Text} from 'react-native-paper';
import {Card, CustomButton} from '../components';
import {useNavigation} from '@react-navigation/native';

const DaftarImunisasiScreen = () => {
  const navigation = useNavigation();

  function onGetTicket() {
    navigation.reset({
      index: 0,
      routes: [{name: 'TiketImunisasi'}],
    });
  }

  return (
    <View style={styles.container}>
      <AppBar showBack={true} title="" style={styles.appBar} />
      <View style={styles.mainContainer}>
        <Text variant={'titleLarge'} style={styles.textTitle}>
          Daftar imunisasi untuk mendapatkan nomor antrian
        </Text>
        <CustomButton
          style={styles.addButton}
          mode={'outlined'}
          onPress={() => navigation.navigate('DaftarAddChild')}>
          + Tambahkan biodata baru
        </CustomButton>
        <Card.ChildCard onButtonPress={() => onGetTicket()} />
      </View>
    </View>
  );
};

export default DaftarImunisasiScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_BACKGROUND,
  },

  appBar: {
    backgroundColor: Colors.COLOR_BACKGROUND,
  },

  mainContainer: {
    flex: 1,
    padding: Size.SIZE_24,
  },

  addButton: {
    backgroundColor: Colors.COLOR_ACCENT,
    borderColor: Colors.COLOR_PRIMARY,
  },

  // text

  textTitle: {
    fontWeight: 'bold',
  },
});
