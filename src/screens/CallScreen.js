import {FlatList, Linking, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors, Size} from '../styles';
import AppBar from '../components/AppBar';
import {Card, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CallScreen = () => {
  const DATA = require('../data/callcenter.json');
  return (
    <View style={styles.container}>
      <AppBar
        showBack={true}
        style={styles.appBar}
        title="Nomor Gawat Darurat"
      />
      <View style={styles.mainContainer}>
        <FlatList
          data={DATA}
          renderItem={({item, index}) => (
            <Card
              style={styles.card}
              onPress={() => Linking.openURL(`tel:${item.number}`)}>
              <Card.Content style={styles.cardContent}>
                <View style={styles.circle}>
                  <Icon name="call" size={20} color={Colors.COLOR_PRIMARY} />
                </View>
                <View>
                  <Text variant={'labelMedium'} style={styles.textTitle}>
                    {item.type}
                  </Text>
                  <Text variant={'labelSmall'} style={styles.textLabel}>
                    {item.number}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          )}
        />
      </View>
    </View>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_BACKGROUND,
  },

  appBar: {
    backgroundColor: Colors.COLOR_BACKGROUND,
  },

  mainContainer: {
    flex: 1,
    paddingHorizontal: Size.SIZE_24,
    paddingVertical: Size.SIZE_14,
  },

  card: {
    backgroundColor: Colors.COLOR_WHITE,
    marginHorizontal: 4,
    marginVertical: 8,
  },

  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  circle: {
    backgroundColor: Colors.COLOR_ACCENT,
    padding: Size.SIZE_12,
    borderRadius: 25,
    marginRight: Size.SIZE_8,
  },

  // text

  textTitle: {
    fontWeight: 'bold',
    marginHorizontal: 8,
    marginBottom: 4,
  },

  textLabel: {
    marginHorizontal: 8,
  },
});
