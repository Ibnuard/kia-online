import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors, Size} from '../styles';
import AppBar from '../components/AppBar';
import {Searchbar, Text} from 'react-native-paper';
import {Card, EmptyList} from '../components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  historyCollection,
  imunisasiCollection,
  imunisasiDone,
} from '../utils/Database';

const AntreanScreen = () => {
  const [antrean, setAntrean] = React.useState();
  const [searchQuery, setSearchQuery] = React.useState('');
  // Nav
  const navigation = useNavigation();
  const route = useRoute();

  const DATA_IMUNISASI = route?.params?.data;

  // IS HISTORY
  const IS_HISTORY = DATA_IMUNISASI?.isHistory;

  const TITLE = DATA_IMUNISASI?.name;

  React.useEffect(() => {
    IS_HISTORY ? getHistoryAntrean() : getAntrean();
  }, []);

  const onChangeSearch = query => setSearchQuery(query);

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

  async function getHistoryAntrean() {
    try {
      await historyCollection
        .doc(DATA_IMUNISASI?.id)
        .collection('Registered')
        .orderBy('child.antrian', 'asc')
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

  const filteredData = (data = []) => {
    const newData = data.filter((item, index) => {
      return (
        item?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item?.child?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    return newData;
  };

  return (
    <View style={styles.container}>
      {IS_HISTORY && <AppBar showBack={true} title={TITLE} />}
      <View style={styles.mainContainer}>
        {filteredData(antrean).length ? (
          <Searchbar
            placeholder="Cari"
            style={styles.searchBar}
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        ) : null}
        {filteredData(antrean).length ? (
          <FlatList
            data={filteredData(antrean)}
            renderItem={({item, index}) => (
              <Card.AdminAntrianCard
                data={item}
                isHistory={IS_HISTORY}
                onPress={() =>
                  IS_HISTORY
                    ? navigation.navigate('HistoryDetail', {
                        data: item,
                      })
                    : navigation.navigate('AdminImunisasi', {
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
    backgroundColor: Colors.COLOR_WHITE,
  },

  appBar: {
    backgroundColor: Colors.COLOR_BACKGROUND,
  },

  mainContainer: {
    flex: 1,
    paddingHorizontal: Size.SIZE_24,
    paddingTop: Size.SIZE_14,
  },

  searchBar: {
    marginTop: 4,
    marginBottom: Size.SIZE_14,
    backgroundColor: Colors.COLOR_BACKGROUND,
  },
});
