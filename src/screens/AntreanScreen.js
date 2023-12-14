import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors, Size} from '../styles';
import AppBar from '../components/AppBar';
import {Text} from 'react-native-paper';
import {Card, EmptyList} from '../components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {imunisasiCollection, imunisasiDone} from '../utils/Database';

const AntreanScreen = () => {
  const [antrean, setAntrean] = React.useState();
  // Nav
  const navigation = useNavigation();
  const route = useRoute();

  const DATA_IMUNISASI = route?.params?.data;

  const TITLE = DATA_IMUNISASI?.name;

  React.useEffect(() => {
    getAntrean();
  }, []);

  async function getAntrean() {
    try {
      await imunisasiCollection
        .doc(DATA_IMUNISASI?.id)
        .collection('Registered')
        .orderBy('antrian', 'asc')
        .onSnapshot(snap => {
          let temp = [];
          snap.forEach(async doc => {
            const data = doc.data();
            temp.push({...data, id: doc.id});
          });

          if (temp.length) {
            const filtered = temp.filter(item => {
              return !item.imunisasiStatus;
            });

            setAntrean(filtered);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <AppBar
        showBack={true}
        style={styles.appBar}
        titlePosition="left"
        title={TITLE}
      />
      <View style={styles.mainContainer}>
        {antrean?.length ? (
          <FlatList
            data={antrean}
            renderItem={({item, index}) => (
              <Card.AdminAntrianCard
                data={item}
                onPress={() =>
                  navigation.navigate('AdminImunisasi', {
                    user: item,
                    imunisasi: DATA_IMUNISASI,
                  })
                }
              />
            )}
          />
        ) : (
          <EmptyList title={'Belum ada pendaftar'} />
        )}
      </View>
    </View>
  );
};

export default AntreanScreen;

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
    paddingTop: Size.SIZE_14,
  },
});
