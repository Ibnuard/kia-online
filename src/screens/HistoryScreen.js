import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Card, CustomButton, EmptyList} from '../components';
import {Colors, Size} from '../styles';
import AppBar from '../components/AppBar';
import {useNavigation} from '@react-navigation/native';
import {historyCollection, usersCollection} from '../utils/Database';
import {AuthContext} from '../context';

// render admin content
function renderAdminContent() {
  const [selectedKey, setSelectedKey] = React.useState('A0');
  const [history, setHistory] = React.useState();

  const navigation = useNavigation();

  console.log(selectedKey);

  const KATEGORI = require('../data/kategori.json');

  React.useEffect(() => {
    getHistory();
  }, [selectedKey]);

  async function getHistory() {
    try {
      await historyCollection
        .where('imunisasi.kode', '==', selectedKey)
        .onSnapshot(snap => {
          let temp = [];
          snap.forEach(doc => {
            temp.push({...doc.data(), id: doc.id});
          });

          console.log(temp);

          setHistory(temp);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <AppBar
        titlePosition="left"
        title="Histori Imunisasi"
        style={styles.appBar}
      />
      <View style={styles.mainContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          overScrollMode={'never'}
          style={styles.contentStyle}>
          {KATEGORI.map((item, index) => {
            return (
              <CustomButton
                mode={selectedKey == item.key ? 'contained' : 'outlined'}
                labelStyle={{
                  color:
                    selectedKey == item?.key
                      ? Colors.COLOR_WHITE
                      : Colors.COLOR_GREY,
                }}
                style={
                  selectedKey == item.key
                    ? styles.buttonList
                    : styles.buttonListDisable
                }
                key={item + index}
                onPress={() => setSelectedKey(item.key)}>
                {item.title}
              </CustomButton>
            );
          })}
        </ScrollView>
        {history?.length ? (
          <FlatList
            data={history}
            renderItem={({item, index}) => (
              <Card.AdminAntrianCard
                isHistory
                data={item}
                onPress={() =>
                  navigation.navigate('HistoryDetail', {data: item})
                }
              />
            )}
          />
        ) : (
          <EmptyList title={'Belum ada data imunisasi'} />
        )}
      </View>
    </View>
  );
}

// render admin content
function renderUserContent(user) {
  const [history, setHistory] = React.useState();

  const navigation = useNavigation();

  React.useEffect(() => {
    getHistory();
  }, []);

  async function getHistory() {
    try {
      await usersCollection
        .doc(user.phone)
        .collection('History')
        .onSnapshot(snap => {
          let temp = [];
          snap.forEach(doc => {
            temp.push({...doc.data(), id: doc.id});
          });

          setHistory(temp);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <AppBar
        titlePosition="left"
        title="Histori Imunisasi"
        style={styles.appBar}
      />
      <View style={styles.mainContainer}>
        {history?.length ? (
          <FlatList
            data={history}
            renderItem={({item, index}) =>
              history?.length > 1 ? (
                <View style={styles.historyRow}>
                  <View style={styles.traillContainer}>
                    <View style={styles.circle} />
                    <View style={styles.dividerTraill} />
                  </View>
                  <Card.ImunisasiCard
                    isHistory={true}
                    data={item}
                    style={styles.cardContainer}
                    onPress={() =>
                      navigation.navigate('HistoryDetail', {data: item})
                    }
                  />
                </View>
              ) : (
                <Card.ImunisasiCard
                  isHistory={true}
                  data={item}
                  style={styles.cardContainer}
                  onPress={() =>
                    navigation.navigate('HistoryDetail', {data: item})
                  }
                />
              )
            }
          />
        ) : (
          <EmptyList title={'Belum ada riwayat imunisasi'} />
        )}
      </View>
    </View>
  );
}

const HistoryScreen = () => {
  const {user} = React.useContext(AuthContext);
  return user.role == 'admin' ? renderAdminContent() : renderUserContent(user);
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  mainContainer: {
    flex: 1,
    paddingHorizontal: Size.SIZE_24,
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

  // ADMIN
  contentStyle: {
    flexGrow: 0,
    paddingVertical: Size.SIZE_14,
  },
  buttonList: {
    marginRight: Size.SIZE_8,
    minWidth: 75,
    height: 45,
  },

  buttonListDisable: {
    marginRight: Size.SIZE_8,
    minWidth: 75,
    height: 45,
    borderColor: Colors.COLOR_GREY,
  },
});
