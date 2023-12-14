import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Card, Chip, Divider, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Scaler, Size} from '../../styles';
import CustomButton from '../Button';
import Gap from '../Gap';
import moment from 'moment';
import {selisihHari} from '../../utils/utils';

const AdminImunisasiCard = props => {
  const {onRegsiterPress, data, onPosPress, onNegPress} = props;

  // H -
  const DEADLINE = selisihHari(data?.jadwal);

  return (
    <Card
      style={{backgroundColor: Colors.COLOR_WHITE, marginVertical: 8}}
      {...props}>
      {!props?.isCategory ? (
        <Card.Content>
          <Chip
            style={DEADLINE >= 0 ? styles.chipActive : styles.chipDisable}
            textStyle={
              DEADLINE >= 0 ? styles.chipActiveText : styles.chipDisableText
            }>
            {DEADLINE == 0
              ? 'Imunisasi sedang berlangsung'
              : DEADLINE > 0
              ? `Imunisasi ${DEADLINE} hari lagi`
              : 'Imunisasi telah berakhir'}
          </Chip>
          <Gap height={14} />
          <View style={styles.topRow}>
            <View style={styles.circle}>
              <Icon size={24} name="needle" color={Colors.COLOR_PRIMARY} />
            </View>
            <View style={styles.leftTop}>
              <Text style={styles.textTitle} variant={'titleMedium'}>
                {data?.name || 'Imunisasi'}
              </Text>
              <Text style={styles.textLabel} variant={'labelSmall'}>
                {data?.formatedJadwal || 'datetime'}
              </Text>
            </View>
            <Icon name="chevron-right" size={24} />
          </View>
          {DEADLINE >= 0 && (
            <View style={styles.rowButton}>
              <CustomButton
                style={styles.posButton}
                onPress={() => (onPosPress ? onPosPress(data?.id) : null)}>
                Ubah
              </CustomButton>
              <CustomButton
                style={styles.negButton}
                labelStyle={styles.textNeg}
                onPress={() => (onNegPress ? onNegPress(data?.id) : null)}>
                Hapus
              </CustomButton>
            </View>
          )}
        </Card.Content>
      ) : (
        <Card.Content>
          <View style={styles.topRow}>
            <View style={styles.circle}>
              <Icon size={24} name="needle" color={Colors.COLOR_PRIMARY} />
            </View>
            <View style={styles.leftTop}>
              <Text style={styles.textTitle} variant={'titleMedium'}>
                {data?.title || 'Title'}
              </Text>
              <Text style={styles.textLabel} variant={'labelSmall'}>
                {data?.desc || 'Desc'}
              </Text>
            </View>
            <Icon name="chevron-right" size={24} />
          </View>
        </Card.Content>
      )}
    </Card>
  );
};

export default AdminImunisasiCard;

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
  },

  verticalDiv: {
    width: 1,
    backgroundColor: Colors.COLOR_GREY,
    height: '50%',
    marginHorizontal: 4,
  },

  rowButton: {
    flexDirection: 'row',
    marginTop: Size.SIZE_24,
  },

  posButton: {
    flex: 1,
    marginHorizontal: 4,
  },

  negButton: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: Colors.COLOR_RED_20,
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

  textNeg: {
    color: Colors.COLOR_RED,
  },

  textInfo: {
    color: Colors.COLOR_GREY,
    padding: Size.SIZE_8,
  },
});
