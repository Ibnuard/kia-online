import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Card, Divider, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Scaler, Size} from '../../styles';
import Gap from '../Gap';
import CustomButton from '../Button';
import moment from 'moment';

const ChildCard = ({
  onButtonPress,
  isFromEdit,
  onPosPress,
  onNegPress,
  data,
}) => {
  const {name, gender, date, id, createdDate} = data;

  console.log(moment(date).format('DD MMMM YYYY'));

  return (
    <Card
      style={{
        backgroundColor: Colors.COLOR_WHITE,
        marginVertical: Size.SIZE_8,
      }}>
      <Card.Content>
        <View style={styles.topRow}>
          <View style={styles.circle}>
            <Icon
              size={24}
              name="emoticon-happy-outline"
              color={Colors.COLOR_PRIMARY}
            />
          </View>
          <View>
            <Text style={styles.textTitle} variant={'titleMedium'}>
              {name}
            </Text>
            <Text style={styles.textLabel} variant={'labelSmall'}>
              Dibuat: {moment(createdDate).format('DD MMMM YYYY')}
            </Text>
          </View>
        </View>
        <Gap height={14} />
        <Divider />
        <Gap height={14} />
        <View style={styles.bottomRow}>
          <View style={styles.bottomRight}>
            <Text variant={'labelSmall'}>Tanggal Lahir</Text>
            <Text style={styles.textSubtitle} variant={'titleMedium'}>
              {moment(date).format('DD MMM YYYY')}
            </Text>
          </View>
          <View style={styles.bottomLeft}>
            <Text variant={'labelSmall'}>Jenis Kelamin</Text>
            <Text style={styles.textSubtitle} variant={'titleMedium'}>
              {gender == 'male' ? 'Laki - laki' : 'Perempuan'}
            </Text>
          </View>
        </View>
        <Gap height={14} />
        {isFromEdit ? (
          <View style={styles.rowButton}>
            <CustomButton
              style={styles.posButton}
              onPress={() => (onPosPress ? onPosPress(id) : null)}>
              Ubah
            </CustomButton>
            <CustomButton
              style={styles.negButton}
              labelStyle={styles.textNeg}
              onPress={() => (onNegPress ? onNegPress(id) : null)}>
              Hapus
            </CustomButton>
          </View>
        ) : (
          <CustomButton onPress={onButtonPress}>Pilih biodata</CustomButton>
        )}
      </Card.Content>
    </Card>
  );
};

export default ChildCard;

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

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    alignItems: 'flex-end',
  },

  bottomRight: {
    flex: 1,
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

  rowButton: {
    flexDirection: 'row',
  },

  // text

  textTitle: {
    fontWeight: 'bold',
  },

  textSubtitle: {
    fontWeight: 'bold',
    marginTop: 4,
  },

  textLabel: {
    color: Colors.COLOR_GREY,
  },

  textNeg: {
    color: Colors.COLOR_RED,
  },
});
