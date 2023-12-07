import {StyleSheet, View} from 'react-native';
import React from 'react';
import AppBar from '../components/AppBar';
import {Colors, Scaler, Size} from '../styles';
import {Card, Divider, Text} from 'react-native-paper';
import {CustomButton, Gap} from '../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const TiketScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <AppBar title="Tiket Imunisasi" style={styles.appBar} />
      <View style={styles.mainContainer}>
        <View style={styles.circle}>
          <Text style={styles.textNomor} variant={'displaySmall'}>
            10
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
              Senin, 11 Desember 2023
            </Text>
          </View>
          <View style={styles.topRow}>
            <Icon
              name={'ticket-confirmation-outline'}
              size={20}
              color={Colors.COLOR_PRIMARY}
            />
            <Text variant={'labelSmall'} style={styles.textTicket}>
              Antrean ke 10
            </Text>
          </View>
        </View>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant={'titleLarge'} style={styles.cardTitle}>
              Biodata Buah Hati
            </Text>
            <Gap height={14} />
            <Divider />
            <Gap height={7} />
            <View style={styles.cardRow}>
              <Text variant={'bodyMedium'} style={styles.cardCaption}>
                Caption
              </Text>
              <Text style={styles.cardValue}>Raden joyo ningrat</Text>
            </View>
            <View style={styles.cardRow}>
              <Text variant={'bodyMedium'} style={styles.cardCaption}>
                Caption
              </Text>
              <Text style={styles.cardValue}>Value</Text>
            </View>
          </Card.Content>
        </Card>
      </View>
      <View style={styles.bottomContainer}>
        <CustomButton onPress={() => navigation.goBack()}>Kembali</CustomButton>
      </View>
    </View>
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
