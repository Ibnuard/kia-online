import {StyleSheet} from 'react-native';
import {Colors, Scaler} from '../../../../styles';

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
  },
  container: {
    width: Scaler.scaleSize(62),
    height: Scaler.scaleSize(62),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.COLOR_WHITE,
    borderRadius: 12,
  },
});

export default styles;
