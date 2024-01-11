import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Card, Chip, Divider, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Scaler, Size} from '../../styles';
import CustomButton from '../Button';
import Gap from '../Gap';
import {selisihHari} from '../../utils/utils';
import moment from 'moment';

const AdminAntrianCard = props => {
  const {onRegsiterPress, data} = props;

  const CHILD_DATA = data?.child;
  const IMUNISASI = data?.imunisasi;

  return (
    <Card
      style={{
        backgroundColor: Colors.COLOR_WHITE,
        marginVertical: 8,
        marginHorizontal: 4,
      }}
      {...props}>
      <Card.Content>
        <View style={styles.topRow}>
          <Chip style={styles.chipActive} textStyle={styles.chipActiveText}>
            {props?.isHistory ? 'Sudah Imunisasi' : 'Belum Imunisasi'}
          </Chip>
          <View style={{flex: 1}} />
          <Text variant={'labelLarge'}>
            Antrean{' '}
            <Text variant={'labelLarge'} style={styles.textTitle}>
              #{data?.antrian || CHILD_DATA?.antrian}
            </Text>
          </Text>
        </View>

        <Gap height={14} />
        <View style={styles.topRow}>
          <View style={styles.circle}>
            <Icon size={24} name="needle" color={Colors.COLOR_BUTTON} />
          </View>
          <View style={styles.leftTop}>
            <Text style={styles.textTitle} variant={'titleMedium'}>
              {data?.name || CHILD_DATA?.name || 'Imunisasi'}
            </Text>
            <Text style={styles.textLabel} variant={'labelSmall'}>
              {data?.formatedJadwal ||
                'Didaftarkan ' +
                  moment(
                    data?.createdDate || CHILD_DATA?.imunisasiTanggal,
                  ).format('DD MMMM YYYY') ||
                'datetime'}
            </Text>
          </View>
        </View>
        {!props?.isUser && (
          <>
            <Gap height={24} />
            <CustomButton onPress={props?.onButtonPressed}>
              {props?.isHistory
                ? 'Lihat hasil imunisasi'
                : 'Masukan hasil imunisasi'}
            </CustomButton>
          </>
        )}
      </Card.Content>
    </Card>
  );
};

export default AdminAntrianCard;

const styles = StyleSheet.create({
  chipDisable: {
    backgroundColor: Colors.COLOR_LIGHT_GRAY,
  },

  chipActive: {
    backgroundColor: Colors.COLOR_GREEN_50,
    paddingVertical: 4,
  },

  chipDisableText: {
    fontSize: Size.SIZE_12,
    color: Colors.COLOR_GREY,
  },

  chipActiveText: {
    fontSize: Size.SIZE_12,
    color: Colors.COLOR_GREEN,
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
    backgroundColor: Colors.COLOR_BUTTON_50,
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
