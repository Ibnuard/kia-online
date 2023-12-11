import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import AppBar from '../components/AppBar';
import {Colors, Size} from '../styles';
import {Text} from 'react-native-paper';
import {Card, CustomButton} from '../components';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {getDBdata, usersCollection} from '../utils/Database';
import {AuthContext, ModalContext} from '../context';
import ModalView from '../components/modal';

const DaftarImunisasiScreen = () => {
  const [childList, setChildList] = React.useState();

  // Nav
  const navigation = useNavigation();
  const route = useRoute();

  const IS_CHILD_LIST = route.name == 'ChildList';
  const IS_UPDATED = route.params?.updated;

  // Stat
  const {user} = React.useContext(AuthContext);

  // Modal
  const {showModal, hideModal, changeModal, modalState} =
    React.useContext(ModalContext);

  // Funcrional
  function onGetTicket() {
    navigation.reset({
      index: 0,
      routes: [{name: 'TiketImunisasi'}],
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      getChildList();
    }, [modalState.visible, IS_UPDATED]),
  );

  async function getChildList() {
    console.log('GET CHILD LIST');
    try {
      await usersCollection
        .doc(user?.phone)
        .collection('childs')
        .onSnapshot(snapshot => {
          let data = [];
          snapshot.forEach(doc => {
            data.push({...doc.data(), id: doc.id});
          });

          setChildList(data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function onDeleteChild(id) {
    await showModal({type: 'loading'});
    try {
      await usersCollection
        .doc(user?.phone)
        .collection('childs')
        .doc(id)
        .delete()
        .then(async () => {
          await changeModal({
            type: 'popup',
            message: 'Biodata berhasil di hapus!',
          });
        });
    } catch (error) {
      await changeModal({
        type: 'popup',
        message: 'Ada sesuatu yang tidak beres, silahkan coba lagi!',
      });
    }
  }

  return (
    <View style={styles.container}>
      <AppBar
        showBack={true}
        title={IS_CHILD_LIST ? 'Biodata Anak' : ''}
        style={styles.appBar}
      />
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          {!IS_CHILD_LIST && (
            <Text variant={'titleLarge'} style={styles.textTitle}>
              Daftar imunisasi untuk mendapatkan nomor antrian
            </Text>
          )}
          {/* <CustomButton
            style={styles.addButton}
            mode={'outlined'}
            onPress={() => navigation.navigate('DaftarAddChild')}>
            + Tambahkan biodata baru
          </CustomButton> */}
          {!childList?.length ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.textEmpty} variant={'labelLarge'}>
                Balum ada biodata anak
              </Text>
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={childList}
              renderItem={({item, index}) => (
                <Card.ChildCard
                  data={item}
                  isFromEdit={IS_CHILD_LIST}
                  onButtonPress={() => onGetTicket()}
                  onNegPress={id => onDeleteChild(id)}
                  onPosPress={id =>
                    navigation.navigate('AddChild', {
                      childId: id,
                      childData: item,
                    })
                  }
                />
              )}
            />
          )}
        </View>
        <View style={styles.bottomContainer}>
          <CustomButton
            onPress={() =>
              navigation.navigate(IS_CHILD_LIST ? 'AddChild' : 'DaftarAddChild')
            }>
            + Buat biodata baru
          </CustomButton>
        </View>
      </View>
      <ModalView
        type={modalState.type}
        visible={modalState.visible}
        message={modalState.message}
        onPress={() => hideModal()}
      />
    </View>
  );
};

export default DaftarImunisasiScreen;

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
    paddingTop: Size.SIZE_24,
  },

  addButton: {
    backgroundColor: Colors.COLOR_ACCENT,
    borderColor: Colors.COLOR_PRIMARY,
  },

  bottomContainer: {
    backgroundColor: Colors.COLOR_WHITE,
    padding: Size.SIZE_24,
    borderTopWidth: 1,
    borderColor: Colors.COLOR_LIGHT_GRAY,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // text

  textTitle: {
    fontWeight: 'bold',
    marginBottom: Size.SIZE_8,
  },

  textEmpty: {
    color: Colors.COLOR_GREY,
  },
});
