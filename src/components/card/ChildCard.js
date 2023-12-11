import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Card, Divider, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Scaler, Size} from '../../styles';
import Gap from '../Gap';
import CustomButton from '../Button';

const ChildCard = ({onButtonPress}) => {
  return (
    <Card style={{backgroundColor: Colors.COLOR_WHITE}}>
      <Card.Content>
        <View style={styles.topRow}>
          <View style={styles.circle}>
            <Icon size={24} name="needle" color={Colors.COLOR_PRIMARY} />
          </View>
          <View>
            <Text style={styles.textTitle} variant={'titleMedium'}>
              Imuniassi Polio
            </Text>
            <Text style={styles.textLabel} variant={'labelSmall'}>
              Desc
            </Text>
          </View>
        </View>
        <Gap height={14} />
        <Divider />
        <Gap height={14} />
        <View style={styles.bottomRow}>
          <View style={styles.bottomLeft}>
            <Text variant={'labelSmall'}>Jenis Kelamin</Text>
            <Text style={styles.textTitle} variant={'titleMedium'}>
              Value
            </Text>
          </View>
          <View style={styles.bottomRight}>
            <Text variant={'labelSmall'}>Tanggal Lahir</Text>
            <Text style={styles.textTitle} variant={'titleMedium'}>
              Value
            </Text>
          </View>
        </View>
        <Gap height={14} />
        <CustomButton onPress={onButtonPress}>Pilih biodata</CustomButton>
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
  },

  bottomRight: {
    flex: 1,
  },

  // text

  textTitle: {
    fontWeight: 'bold',
  },

  textLabel: {
    color: Colors.COLOR_GREY,
  },
});
