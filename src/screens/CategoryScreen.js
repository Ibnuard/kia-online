import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors, Size} from '../styles';
import AppBar from '../components/AppBar';
import {Text} from 'react-native-paper';
import {Card} from '../components';
import {useNavigation} from '@react-navigation/native';

const CategoryScreen = () => {
  const IMUNISASI_LIST = require('../data/imunisasi.json');

  // Nav
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <AppBar
        title="Buat Jadwal Imunisasi"
        style={styles.appBar}
        titlePosition="left"
      />
      <View style={styles.mainContainer}>
        <FlatList
          data={IMUNISASI_LIST}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <Card.AdminImunisasiCard
              key={index}
              data={{title: item.name, desc: 'Klik untuk buat jadwal baru'}}
              isCategory={true}
              onPress={() => navigation.navigate('BuatJadwal', {data: item})}
            />
          )}
        />
      </View>
    </View>
  );
};

export default CategoryScreen;

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
    paddingHorizontal: Size.SIZE_24,
  },
});
