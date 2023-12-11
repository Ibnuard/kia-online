import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Card} from '../components';
import {Colors, Size} from '../styles';
import AppBar from '../components/AppBar';
import {useNavigation} from '@react-navigation/native';

const HistoryScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <AppBar
        titlePosition="left"
        title="Histori Imunisasi"
        style={styles.appBar}
      />
      <View style={styles.mainContainer}>
        <View style={styles.historyRow}>
          <View style={styles.traillContainer}>
            <View style={styles.circle} />
            <View style={styles.dividerTraill} />
          </View>
          <Card.ImunisasiCard
            style={styles.cardContainer}
            onPress={() => navigation.navigate('HistoryDetail')}
          />
        </View>
      </View>
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  mainContainer: {
    flex: 1,
    padding: Size.SIZE_24,
    backgroundColor: Colors.COLOR_BACKGROUND,
  },

  appBar: {
    backgroundColor: Colors.COLOR_BACKGROUND,
  },

  historyRow: {
    flexDirection: 'row',
  },

  circle: {
    height: Size.SIZE_12,
    width: Size.SIZE_12,
    backgroundColor: Colors.COLOR_PRIMARY,
    borderRadius: 6,
  },

  cardContainer: {
    flex: 1,
    marginBottom: Size.SIZE_14,
    backgroundColor: Colors.COLOR_WHITE,
  },

  traillContainer: {
    alignItems: 'center',
    marginRight: Size.SIZE_14,
  },

  dividerTraill: {
    width: 2,
    flex: 1,
    borderLeftWidth: 2,
    borderColor: Colors.COLOR_PRIMARY,
    borderStyle: 'dashed',
  },
});
