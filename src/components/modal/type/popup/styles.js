import {StyleSheet} from 'react-native';
import {Colors, Size, Typo} from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Size.SIZE_12,
    paddingHorizontal: Size.SIZE_18,
    backgroundColor: Colors.COLOR_WHITE,
    borderRadius: 8,
  },

  buttonOk: {
    padding: Size.SIZE_8,
    marginTop: Size.SIZE_14,
  },

  circlePositive: {
    backgroundColor: Colors.COLOR_BUTTON_50,
  },

  circleNegative: {
    backgroundColor: Colors.COLOR_RED_20,
  },

  //text style

  textMessage: {
    ...Typo.TextNormalRegular,
    textAlign: 'center',
  },

  textButton: {
    ...Typo.TextNormalBold,
    color: Colors.COLOR_PRIMARY,
  },

  textTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default styles;
