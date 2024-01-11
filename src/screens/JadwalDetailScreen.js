import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors, Size} from '../styles';
import {Card, CustomButton, Gap} from '../components';
import {Text} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import {imunisasiCollection} from '../utils/Database';
import {AuthContext} from '../context';
import AppBar from '../components/AppBar';

const JadwalDetailScreen = () => {
  const [total, setTotal] = React.useState();

  const route = useRoute();

  const DATA = route?.params?.data;

  const {user} = React.useContext(AuthContext);

  const navigation = useNavigation();

  const IS_USER = user.role === 'user';

  React.useEffect(() => {
    getAntrianTotal();
  }, []);

  async function getAntrianTotal() {
    try {
      const totalUser = await imunisasiCollection
        .doc(DATA?.id)
        .collection('Registered')
        .count()
        .get();

      const countValue = totalUser.data().count;

      setTotal(countValue);
    } catch (error) {
      console.log(error);
    }
  }

  const DETAILS = [
    {
      title: 'Nama Posyandu',
      value: DATA?.posyandu,
    },
    {
      title: 'Tanggal Imunisasi',
      value: moment(DATA?.jadwal).format('DD MMMM YYYY'),
    },
    {
      title: 'Alamat',
      value: DATA?.alamat,
    },
  ];

  return (
    <View style={IS_USER ? styles.containerUser : styles.container}>
      {IS_USER && <AppBar showBack={true} title="Detail Imunisasi" />}
      <View style={{flex: 1, padding: IS_USER ? Size.SIZE_24 : undefined}}>
        <Card.AdminImunisasiCard
          hideRight={true}
          data={{
            title: DATA?.name,
            desc: `Total Antrean : ${total}`,
          }}
          isCategory={true}
        />
        <Gap height={14} />
        {DETAILS.map((item, index) => {
          return (
            <View key={item + index} style={styles.infoContainer}>
              <Text variant={'labelMedium'} style={styles.textCaption}>
                {item.title}
              </Text>
              <Text style={styles.textValue} variant={'titleSmall'}>
                {item.value || '-'}
              </Text>
            </View>
          );
        })}
      </View>
      {IS_USER && (
        <View style={styles.bottomContainer}>
          <CustomButton
            onPress={() =>
              navigation.navigate('DaftarChildList', {data: DATA})
            }>
            Daftar Imunisasi
          </CustomButton>
        </View>
      )}
    </View>
  );
};

export default JadwalDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
    paddingHorizontal: Size.SIZE_24,
    paddingVertical: Size.SIZE_14,
  },

  containerUser: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
  },

  infoContainer: {
    marginVertical: Size.SIZE_14,
  },

  bottomContainer: {
    padding: Size.SIZE_24,
  },

  // text

  textCaption: {
    color: Colors.COLOR_GREY,
  },

  textValue: {
    color: Colors.COLOR_BLACK,
    paddingVertical: 4,
  },
});
