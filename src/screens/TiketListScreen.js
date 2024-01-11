import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Size} from '../styles';
import AppBar from '../components/AppBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import {imunisasiCollection} from '../utils/Database';
import {AuthContext} from '../context';
import {Card, EmptyList} from '../components';

const TiketListScreen = () => {
  const [list, setList] = React.useState();
  // Nav
  const navigation = useNavigation();
  const route = useRoute();

  // STAT
  const {user} = React.useContext(AuthContext);

  const DATA_IMUNISASI = route.params?.data;

  React.useEffect(() => {
    getTiketList();
  }, []);

  async function getTiketList() {
    try {
      await imunisasiCollection
        .doc(DATA_IMUNISASI?.id)
        .collection('Registered')
        .where('parentId', '==', user?.phone)
        .onSnapshot(snap => {
          let temp = [];
          snap.forEach(doc => {
            temp.push({...doc.data(), id: doc.id});
          });

          if (temp.length) {
            const filtered = temp.filter(item => {
              return !item.imunisasiStatus;
            });

            setList(filtered);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  console.log(list);

  return (
    <View style={styles.container}>
      <AppBar
        style={styles.appBar}
        showBack={true}
        titlePosition={'left'}
        title="Tiket Imunisasi"
      />
      <View style={styles.mainContainer}>
        {list?.length ? (
          <FlatList
            data={list}
            renderItem={({item, index}) => (
              <Card.AdminAntrianCard
                isUser={true}
                data={item}
                onPress={() =>
                  navigation.navigate('Tiketku', {
                    data: item,
                    imunisasi: DATA_IMUNISASI,
                  })
                }
              />
            )}
          />
        ) : (
          <EmptyList title={'Belum ada tiket imunisasi'} />
        )}
      </View>
    </View>
  );
};

export default TiketListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_BACKGROUND,
  },

  appBar: {},

  mainContainer: {
    flex: 1,
    paddingHorizontal: Size.SIZE_24,
    paddingTop: Size.SIZE_14,
  },
});
