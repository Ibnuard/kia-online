import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Size} from '../styles';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Card, EmptyList} from '../components';
import {
  checkImunisasiStatus,
  getChildList,
  imunisasiCollection,
} from '../utils/Database';
import {AuthContext} from '../context';
import {mergeDataBySameId, selisihHari} from '../utils/utils';

const RegisteredImunScreen = () => {
  const [jadwal, setJadwal] = React.useState();

  // STAT
  const {user} = React.useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      getJadwal();
    }, []),
  );

  async function getJadwal() {
    try {
      await imunisasiCollection.onSnapshot(async snap => {
        let temp = [];
        snap.forEach(async doc => {
          const data = doc.data();
          const deadline = selisihHari(data?.jadwal);
          const parents = data?.parents;

          const isRegistered = parents?.includes(user?.phone);

          if (deadline >= 0 && isRegistered) {
            temp.push({...doc.data(), id: doc.id});
          }
        });

        if (temp?.length) {
          setJadwal(temp);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  console.log('JADWAL : ' + JSON.stringify(jadwal));

  // Nav
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {jadwal?.length ? (
        <FlatList
          data={jadwal}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <Card.ImunisasiCard
              user={user}
              data={item}
              isRegistered={true}
              onRegsiterPress={() =>
                navigation.navigate('TiketList', {
                  data: item,
                })
              }
            />
          )}
        />
      ) : (
        <EmptyList title={'Belum ada jadwal imunisasi'} />
      )}
    </View>
  );
};

export default RegisteredImunScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Size.SIZE_24,
    paddingTop: Size.SIZE_14,
  },
});
