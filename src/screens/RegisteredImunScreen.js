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
          if (deadline >= 0) {
            temp.push({...doc.data(), id: doc.id});
          }
        });

        if (temp?.length) {
          await getChildList(user?.phone, async childs => {
            let newData = [];
            for (let i = 0; i < temp.length; i++) {
              for (let j = 0; j < childs.length; j++) {
                const status = await checkImunisasiStatus(
                  temp[i].id,
                  childs[j].id,
                );
                if (status) {
                  newData.push(temp[i]);
                }
              }
            }

            const merged = mergeDataBySameId(newData);

            setJadwal(merged);
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

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
              isRegistered={true}
              data={item}
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
