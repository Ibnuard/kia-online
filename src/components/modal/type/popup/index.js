import * as React from 'react';
import {View} from 'react-native';
import styles from './styles';
import Touchable from '../../../touchable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar, Text} from 'react-native-paper';
import {Colors} from '../../../../styles';
import CustomButton from '../../../Button';
import Gap from '../../../Gap';

const ModalPopUp = ({onButtonPress, title, message, status}) => {
  const statusBg =
    status == 'OK' || status == 'WARN'
      ? styles.circlePositive
      : styles.circleNegative;
  const iconColor =
    status == 'OK' || status == 'WARN'
      ? Colors.COLOR_PRIMARY
      : Colors.COLOR_RED;

  const iconName = () => {
    if (status == 'OK') {
      return 'check';
    } else {
      return 'information-outline';
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Avatar.Icon style={statusBg} icon={iconName()} color={iconColor} />
      </View>
      <Gap height={24} />
      {title && (
        <Text style={styles.textTitle} variant={'titleLarge'}>
          {title}
        </Text>
      )}
      <Text style={styles.textMessage}>{message}</Text>
      <Gap height={24} />
      <View style={{width: '100%', flexDirection: 'row'}}>
        <CustomButton
          onPress={onButtonPress ? onButtonPress : null}
          style={{flex: 1}}>
          Confirm
        </CustomButton>
      </View>

      {/* <Touchable
        style={styles.buttonOk}
        onPress={onButtonPress ? onButtonPress : null}>
        <Text style={styles.textButton}>Ok</Text>
      </Touchable> */}
    </View>
  );
};

export default ModalPopUp;
