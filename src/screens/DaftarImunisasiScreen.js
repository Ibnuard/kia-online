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
import {
  getDBdata,
  imunisasiCollection,
  usersCollection,
} from '../utils/Database';
import {AuthContext, ModalContext} from '../context';
import ModalView from '../components/modal';
import moment from 'moment';

const DaftarImunisasiScreen = () => {
  const [childList, setChildList] = React.useState();
  const [modalOk, setModalOk] = React.useState(false);
  const [antrian, setAntrian] = React.useState();
  const [selectedChild, setSelectedChild] = React.useState();

  // Nav
  const navigation = useNavigation();
  const route = useRoute();

  const IS_CHILD_LIST = route.name == 'ChildList';
  const IS_UPDATED = route.params?.updated;

  const DATA_IMUNISASI = route?.params?.data;

  // Stat
  const {user} = React.useContext(AuthContext);

  // Modal
  const {showModal, hideModal, changeModal, modalState} =
    React.useContext(ModalContext);

  // Funcrional
  async function onGetTicket(item) {
    setSelectedChild(item);
    await showModal({type: 'loading'});
    try {
      const getAntrian = await imunisasiCollection
        .doc(DATA_IMUNISASI?.id)
        .collection('Registered')
        .count()
        .get();

      const sAntrian = getAntrian.data().count + 1;

      setAntrian(sAntrian);

      await usersCollection
        .doc(user?.phone)
        .collection('recent')
        .add({
          ...DATA_IMUNISASI,
          createdDate: moment().format(),
        });

      imunisasiCollection
        .doc(DATA_IMUNISASI.id)
        .collection('Registered')
        .doc(item.id)
        .set({
          ...item,
          parentId: user?.phone,
          createdDate: moment().format(),
          antrian: sAntrian,
        })
        .then(async () => {
          setModalOk(true);
          await changeModal({
            type: 'popup',
            message: 'Anda telah berhasil mendaftar!',
          });
        });
    } catch (error) {
      setModalOk(false);
      await changeModal({
        type: 'popup',
        message: 'Ada sesuatu yang tidak beres, silahkan coba lagi!',
      });
      console.log(error);
    }
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
          setModalOk(true);
          await changeModal({
            type: 'popup',
            message: 'Biodata berhasil di hapus!',
          });
        });
    } catch (error) {
      setModalOk(false);
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
              Pilih biodata anak untuk didafaftarkan
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
                  onButtonPress={() => onGetTicket(item)}
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
        onModalHide={() =>
          modalOk && !IS_UPDATED && !IS_CHILD_LIST
            ? navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'TiketImunisasi',
                    params: {
                      imunisasi: DATA_IMUNISASI,
                      child: selectedChild,
                      antrian: antrian,
                    },
                  },
                ],
              })
            : null
        }
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
