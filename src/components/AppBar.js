import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Colors, Scaler} from '../styles';
import Gap from './Gap';

const AppBar = ({
  showBack,
  titlePosition = 'center',
  title = 'Title',
  style,
}) => {
  const navigation = useNavigation();
  return (
    <Appbar.Header style={[{backgroundColor: Colors.COLOR_WHITE}, style]}>
      {showBack && <Appbar.BackAction onPress={() => navigation.goBack()} />}
      {!showBack && titlePosition == 'left' ? (
        <Gap width={14} />
      ) : (
        <Gap width={titlePosition == 'left' ? 50 : 0} />
      )}
      <Appbar.Content
        style={{
          ...styles[`content${titlePosition}`],
          marginLeft: showBack ? -Scaler.scaleSize(40) : 0,
        }}
        titleStyle={styles.textTitle}
        title={title}
      />
    </Appbar.Header>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  contentcenter: {
    alignItems: 'center',
  },

  contentleft: {
    alignItems: 'flex-start',
  },

  // text

  textTitle: {
    fontWeight: 'bold',
  },
});
