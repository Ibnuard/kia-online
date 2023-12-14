import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Card, Chip, Divider, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Scaler, Size} from '../../styles';
import CustomButton from '../Button';
import Gap from '../Gap';
import {selisihHari} from '../../utils/utils';
import moment from 'moment';

const RecentJadwalCard = props => {
  const {onRegsiterPress, data} = props;

  const DEADLINE = selisihHari(data?.jadwal);

  return (
    <Card
      style={{
        backgroundColor: Colors.COLOR_WHITE,
        marginVertical: Size.SIZE_14,
      }}
      {...props}>
      <Card.Content>
        <Chip style={styles.chipActive} textStyle={styles.chipActiveText}>
          {DEADLINE > 0
            ? `Imunisasi dalam ${DEADLINE} hari lagi`
            : DEADLINE == 0
            ? 'Imunisasi sedang berlangsung'
            : ''}
        </Chip>
        <Gap height={14} />
        <View style={styles.topRow}>
          <View style={styles.circle} />
          <View style={styles.leftTop}>
            <Text style={styles.textTitle} variant={'titleMedium'}>
              {data?.name || 'Imunisasi'}
            </Text>
            <Text style={styles.textLabel} variant={'labelSmall'}>
              {data?.formatedJadwal ||
                'Didaftarkan ' +
                  moment(data?.createdDate).format('DD MMMM YYYY') ||
                'datetime'}
            </Text>
          </View>
          <Icon name="chevron-right" size={24} />
        </View>
      </Card.Content>
    </Card>
  );
};

export default RecentJadwalCard;

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
    width: Scaler.scaleSize(4),
    height: Scaler.scaleSize(45),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: Colors.COLOR_ACCENT,
    marginRight: Size.SIZE_10,
  },

  bottomLeft: {
    flex: 1,
  },

  bottomRight: {
    flex: 1,
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
