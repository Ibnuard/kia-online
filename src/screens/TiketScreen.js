import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import AppBar from '../components/AppBar';
import {Colors, Scaler, Size} from '../styles';
import {Card, Divider, Text} from 'react-native-paper';
import {CustomButton, Gap} from '../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {hitungUmur} from '../utils/utils';
import moment from 'moment';

const TiketScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const IMUNISASI = route.params?.imunisasi;
  const CHILD = route?.params?.child;
  const ANTRIAN = route.params?.antrian;

  const DATA = route?.params?.data;

  console.log(DATA);

  return (
    <ScrollView style={styles.container}>
      <AppBar title="Tiket Imunisasi" style={styles.appBar} />
      <View style={styles.mainContainer}>
        <View style={styles.circle}>
          <Text style={styles.textNomor} variant={'displaySmall'}>
            {ANTRIAN || DATA?.antrian}
          </Text>
        </View>
        <Gap height={14} />
        <Text variant={'titleLarge'} style={styles.textTitle}>
          Buah hati anda telah terdaftar di Program Imunisasi!
        </Text>
        <View style={styles.topContent}>
          <View style={styles.topRow}>
            <Icon name={'calendar-range'} size={20} />
            <Text variant={'labelSmall'} style={styles.textDate}>
              {moment(IMUNISASI?.jadwal).format('DD MMMM YYYY')}
            </Text>
          </View>
          <View style={styles.topRow}>
            <Icon
              name={'ticket-confirmation-outline'}
              size={20}
              color={Colors.COLOR_PRIMARY}
            />
            <Text variant={'labelSmall'} style={styles.textTicket}>
              Antrean ke {ANTRIAN || DATA?.antrian}
            </Text>
          </View>
        </View>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant={'titleLarge'} style={styles.cardTitle}>
              Biodata Buah Hati
            </Text>
            <Gap height={14} />
            <Divider bold />
            <Gap height={7} />
            <View style={styles.cardRow}>
              <Text variant={'bodyMedium'} style={styles.cardCaption}>
                Nama lengkap
              </Text>
              <Text style={styles.cardValue}>{CHILD?.name || DATA?.name}</Text>
            </View>
            <View style={styles.cardRow}>
              <Text variant={'bodyMedium'} style={styles.cardCaption}>
                Umur
              </Text>
              <Text style={styles.cardValue}>
                {hitungUmur(CHILD?.date || DATA?.date)} tahun
              </Text>
            </View>
          </Card.Content>
        </Card>
        <Gap height={14} />
        <Card style={styles.card}>
          <Card.Content>
            <Text variant={'titleLarge'} style={styles.cardTitle}>
              Imunisasi
            </Text>
            <Gap height={14} />
            <Divider bold />
            <Gap height={7} />
            <View style={styles.cardRow}>
              <Text variant={'bodyMedium'} style={styles.cardCaption}>
                Jenis program
              </Text>
              <Text style={styles.cardValue}>{IMUNISASI?.name}</Text>
            </View>
            <View style={styles.cardRow}>
              <Text variant={'bodyMedium'} style={styles.cardCaption}>
                Tanggal Imunisasi
              </Text>
              <Text style={styles.cardValue}>
                {moment(IMUNISASI?.jadwal).format('DD MMMM YYYY')}
              </Text>
            </View>
            <View style={styles.cardRow}>
              <Text variant={'bodyMedium'} style={styles.cardCaption}>
                Tempat
              </Text>
              <Text style={styles.cardValue}>{IMUNISASI?.posyandu}</Text>
            </View>
          </Card.Content>
        </Card>
      </View>
      <View style={styles.bottomContainer}>
        <CustomButton onPress={() => navigation.goBack()}>Kembali</CustomButton>
      </View>
    </ScrollView>
  );
};

export default TiketScreen;

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

  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Size.SIZE_24,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  circle: {
    width: Scaler.scaleSize(80),
    height: Scaler.scaleSize(80),
    backgroundColor: Colors.COLOR_PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    alignSelf: 'center',
  },

  card: {
    backgroundColor: Colors.COLOR_WHITE,
  },

  cardTitle: {
    fontWeight: 'bold',
  },

  cardRow: {
    flexDirection: 'row',
    marginVertical: Size.SIZE_8,
  },

  cardCaption: {
    flex: 1,
    fontWeight: 'bold',
  },

  cardValue: {
    color: Colors.COLOR_GREY,
  },

  bottomContainer: {
    padding: Size.SIZE_24,
  },

  // text

  textTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },

  textDate: {
    paddingHorizontal: 4,
  },

  textTicket: {
    paddingHorizontal: 4,
    color: Colors.COLOR_PRIMARY,
  },

  textNomor: {
    color: Colors.COLOR_WHITE,
  },
});
