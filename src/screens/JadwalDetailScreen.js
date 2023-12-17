import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors, Size} from '../styles';
import {Card, Gap} from '../components';
import {Text} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import {imunisasiCollection} from '../utils/Database';

const JadwalDetailScreen = () => {
  const [total, setTotal] = React.useState();

  const route = useRoute();

  const DATA = route?.params?.data;

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
    <View style={styles.container}>
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
  );
};

export default JadwalDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
    padding: Size.SIZE_24,
  },

  infoContainer: {
    marginVertical: Size.SIZE_14,
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
