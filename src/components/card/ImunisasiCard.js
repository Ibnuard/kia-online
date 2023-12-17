import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Card, Chip, Divider, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Scaler, Size} from '../../styles';
import CustomButton from '../Button';
import Gap from '../Gap';
import moment from 'moment';
import {selisihHari} from '../../utils/utils';

const ImunisasiCard = props => {
  const {onRegsiterPress} = props;
  const DATA = props?.data;
  const USER = props?.user;

  const DEADLINE = selisihHari(DATA?.jadwal);

  const parentList = DATA?.parents;
  const isRegistered = parentList?.includes(USER?.phone);

  return (
    <Card
      style={{backgroundColor: Colors.COLOR_WHITE, marginVertical: 8}}
      {...props}>
      {!props.small ? (
        <Card.Content>
          {props.isHistory ? (
            <>
              <Chip
                style={styles.chipDisable}
                textStyle={styles.chipDisableText}>
                Imunisasi telah dilaksanakan
              </Chip>
              <Gap height={14} />
            </>
          ) : props.isRegistered ? (
            <>
              <Chip style={styles.chipActive} textStyle={styles.chipActiveText}>
                {DEADLINE > 0
                  ? `Imunisasi dalam ${DEADLINE} hari lagi`
                  : DEADLINE == 0
                  ? 'Imunisasi sedang berlangsung'
                  : ''}
              </Chip>
              <Gap height={14} />
            </>
          ) : (
            <>
              <Chip
                style={isRegistered ? styles.chipActive : styles.chipDisable}
                textStyle={
                  isRegistered ? styles.chipActiveText : styles.chipDisableText
                }>
                {isRegistered
                  ? 'Anak anda telah terdaftar di sesi ini'
                  : 'Anak anda belum terdaftar di sesi ini'}
              </Chip>
              <Gap height={14} />
            </>
          )}

          <View style={styles.topRow}>
            <View style={styles.circle}>
              <Icon size={24} name="needle" color={Colors.COLOR_PRIMARY} />
            </View>
            <View>
              <Text style={styles.textTitle} variant={'titleMedium'}>
                {DATA?.name || DATA?.child?.name}
              </Text>
              <Text style={styles.textLabel} variant={'labelSmall'}>
                {props?.isHistory
                  ? DATA?.imunisasi?.name
                  : `Dibuat pada ${moment(DATA?.createdDate).format(
                      'DD MMMM YYYY',
                    )}`}
              </Text>
            </View>
          </View>
          <Gap height={14} />
          <Divider />
          <Gap height={14} />
          <View style={styles.topRow}>
            <View style={styles.bottomLeft}>
              <Text variant={'labelSmall'}>Tanggal Imunisasi</Text>
              <Text style={styles.textTitle} variant={'titleSmall'}>
                {moment(DATA?.jadwal || DATA?.imunisasi?.jadwal).format(
                  'DD MMMM YYYY',
                )}
              </Text>
            </View>
            <View style={styles.bottomRight}>
              <Text variant={'labelSmall'}>Tempat Imunisasi</Text>
              <Text
                style={styles.textTitle}
                variant={'titleSmall'}
                numberOfLines={1}>
                {DATA?.posyandu || DATA?.imunisasi?.posyandu}
              </Text>
            </View>
          </View>
          {!props.isHistory && (
            <>
              <Gap height={14} />
              <CustomButton onPress={onRegsiterPress}>
                {props?.isRegistered ? 'Lihat Tiket' : 'Daftar Imunisasi'}
              </CustomButton>
            </>
          )}
        </Card.Content>
      ) : (
        <Card.Content>
          {!props?.admin && (
            <>
              <Chip
                style={styles.chipDisable}
                textStyle={styles.chipDisableText}>
                {props?.isHistory
                  ? 'Imunisasi telah dilaksanakan'
                  : 'Kamu belum terdaftar di sesi ini'}
              </Chip>
              <Gap height={14} />
            </>
          )}

          <View style={styles.topRow}>
            <View style={styles.circle}>
              <Icon size={24} name="needle" color={Colors.COLOR_PRIMARY} />
            </View>
            <View style={styles.leftTop}>
              <Text style={styles.textTitle} variant={'titleMedium'}>
                {DATA?.name}
              </Text>
              <Text style={styles.textLabel} variant={'labelSmall'}>
                {moment(DATA?.jadwal).format('DD MMMM YYYY')}
              </Text>
            </View>
            <View style={styles.verticalDiv} />
            <View style={styles.rightTop}>
              <Text variant={'labelSmall'} style={styles.textAntreanCaption}>
                Antrian
              </Text>
              <Text variant={'titleLarge'} style={styles.textAntrean}>
                #{USER?.antrian || DATA?.antrian}
              </Text>
            </View>
          </View>
        </Card.Content>
      )}
    </Card>
  );
};

export default ImunisasiCard;

const styles = StyleSheet.create({
  chipDisable: {
    backgroundColor: Colors.COLOR_LIGHT_GRAY,
  },

  chipActive: {
    backgroundColor: Colors.COLOR_ACCENT,
  },

  chipDisableText: {
    fontSize: Size.SIZE_12,
    color: Colors.COLOR_GREY,
  },

  chipActiveText: {
    fontSize: Size.SIZE_12,
    color: Colors.COLOR_PRIMARY,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  leftTop: {
    flex: 1,
  },

  rightTop: {
    alignItems: 'center',
    paddingHorizontal: Size.SIZE_14,
  },

  circle: {
    width: Scaler.scaleSize(45),
    height: Scaler.scaleSize(45),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 27,
    backgroundColor: Colors.COLOR_ACCENT,
    marginRight: Size.SIZE_10,
  },

  bottomLeft: {
    flex: 1,
  },

  bottomRight: {
    flex: 1,
    alignItems: 'flex-end',
  },

  verticalDiv: {
    width: 1,
    backgroundColor: Colors.COLOR_GREY,
    height: '50%',
    marginHorizontal: 4,
  },

  // text

  textTitle: {
    fontWeight: 'bold',
  },

  textLabel: {
    color: Colors.COLOR_GREY,
  },

  textAntrean: {
    fontWeight: 'bold',
  },

  textAntreanCaption: {
    color: Colors.COLOR_GREY,
  },
});
