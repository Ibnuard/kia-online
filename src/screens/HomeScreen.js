import {
  Dimensions,
  FlatList,
  Image,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {Colors, Scaler, Size} from '../styles';
import {ActivityIndicator, Card, Text} from 'react-native-paper';
import {CustomButton, Gap, Card as CustomCard, EmptyList} from '../components';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ASSETS} from '../utils/assetsLoader';
import {AuthContext, ModalContext} from '../context';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {MyTabBar} from '../components/TabBar';
import {imunisasiCollection, usersCollection} from '../utils/Database';
import {selisihHari} from '../utils/utils';
import ModalView from '../components/modal';

const {width} = Dimensions.get('window');

const HomeScreen = () => {
  const [news, setNews] = React.useState([]);
  const [jadwal, setJadwal] = React.useState();
  const [jadwalDone, setJadwalDone] = React.useState();
  const [recentImunisasi, setRecentImunisasi] = React.useState();

  // Nav
  const navigation = useNavigation();

  // User session
  const {user} = React.useContext(AuthContext);
  const {showModal, changeModal, hideModal, modalState} =
    React.useContext(ModalContext);

  // TopBar
  const Tab = createMaterialTopTabNavigator();

  React.useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  React.useEffect(() => {
    if (user?.role == 'user') {
      getNews();
      getRecent();
      return;
    } else {
      getJadwal();
    }

    return () => null;
  }, []);

  // get news
  async function getNews() {
    console.log('GET NEWS');
    const res = await fetch(
      'https://berita-indo-api-next.vercel.app/api/suara-news/health',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', //or other
        },
      },
    );

    const resJson = await res.json();

    if (resJson.length !== 0) {
      setNews(resJson.data.slice(0, 5));
    } else {
      console.log('Error fetching');
    }
  }

  // recent
  async function getRecent() {
    try {
      await imunisasiCollection.onSnapshot(async snap => {
        let temp = [];
        snap.forEach(async doc => {
          const data = doc.data();
          const deadline = selisihHari(data?.jadwal);
          const parents = data?.parents;

          const isRegistered = parents?.includes(user?.phone);

          if (deadline >= 0 && isRegistered) {
            temp.push({...doc.data(), id: doc.id});
          }
        });

        if (temp?.length) {
          setRecentImunisasi(temp.slice(0, 2));
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Admin
  async function getJadwal() {
    await imunisasiCollection
      .orderBy('createdDate', 'desc')
      .onSnapshot(snap => {
        let temp = [];
        let tempdone = [];
        snap?.forEach(doc => {
          const data = doc.data();

          if (selisihHari(data?.jadwal) >= 0) {
            if (data.adminId !== user?.phone) return;
            temp.push({...doc.data(), id: doc.id});
          } else {
            if (data.adminId !== user?.phone) return;
            tempdone.push({...doc.data(), id: doc.id});
          }
        });

        setJadwal(temp);
        setJadwalDone(tempdone);
      });
  }

  // admin on delete
  async function onDeleteJadwal(id) {
    await showModal({type: 'loading'});
    try {
      await imunisasiCollection
        .doc(id)
        .delete()
        .then(async () => {
          await changeModal({
            type: 'popup',
            status: 'OK',
            message: 'Berhasil menghapus jadwal!',
          });
        });
    } catch (error) {
      console.log(error);
      await changeModal({
        type: 'popup',
        status: 'ERROR',
        message: 'Ada sesuatu yang tidak beres, silahkan coba lagi!',
      });
    }
  }

  //  RENDER USER CONTENT
  function renderUserContent() {
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.topContent}>
          <Text style={styles.textHi} variant={'bodyMedium'}>
            Halo, {user?.name}
          </Text>
        </View>

        <Text style={styles.textTitle} variant={'titleMedium'}>
          Jadwal Imunisasi Anak
        </Text>

        {!recentImunisasi?.length ? (
          <Card mode={'contained'} style={styles.cardNoJadwal}>
            <Card.Content>
              <Text style={styles.textCardNoJadwal} variant={'labelMedium'}>
                Belum ada jadwal imunisasi
              </Text>
            </Card.Content>
          </Card>
        ) : (
          <ScrollView
            style={{flexGrow: 0}}
            showsHorizontalScrollIndicator={false}
            horizontal>
            {recentImunisasi.map((item, index) => {
              return (
                <View
                  key={item + index}
                  style={{
                    marginRight: Size.SIZE_14,
                    width: width - Scaler.scaleSize(50),
                  }}>
                  <CustomCard.RecentJadwalCard
                    data={item}
                    onPress={() =>
                      navigation.jumpTo('Imunisasi', {
                        screen: 'KategoriNav',
                        params: {
                          screen: 'Terdaftar',
                        },
                      })
                    }
                  />
                </View>
              );
            })}
          </ScrollView>
        )}

        <Text style={styles.textTitle} variant={'titleMedium'}>
          Berita Terbaru
        </Text>
        <Gap height={10} />
        <View style={styles.promoContainer}>
          <Image
            source={ASSETS.promo}
            style={styles.promoImg}
            resizeMode={'contain'}
          />
          <View style={styles.promoButtonContainer}>
            <CustomButton
              style={styles.promoButton}
              labelStyle={styles.promoButtonLabel}
              onPress={() =>
                navigation.navigate('HomeNews', {
                  data: {
                    link: 'https://www.alodokter.com/mengapa-memilih-menyusui',
                  },
                })
              }>
              Baca sekarang
            </CustomButton>
          </View>
        </View>
        <Text style={styles.textTitle} variant={'titleMedium'}>
          Buletin Kesehatan
        </Text>
        <Gap height={10} />
        <View style={styles.newsContainer}>
          {news && news.length ? (
            news.map((item, index) => {
              return (
                <CustomCard.BeritaCard
                  onPress={() => navigation.navigate('HomeNews', {data: item})}
                  key={item + index}
                  data={item}
                />
              );
            })
          ) : (
            <View style={styles.newsLoading}>
              <ActivityIndicator />
            </View>
          )}
        </View>
      </ScrollView>
    );
  }

  // List on going
  function RenderAdminOnGoing() {
    return (
      <View style={styles.listModeContainer}>
        {jadwal?.length ? (
          <FlatList
            data={jadwal}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <CustomCard.AdminImunisasiCard
                data={item}
                onPosPress={id =>
                  navigation.navigate('Jadwal', {data: item, isUpdate: true})
                }
                onNegPress={() => onDeleteJadwal(item.id)}
                onPress={() =>
                  navigation.navigate('JadwalDetail', {
                    data: item,
                  })
                }
              />
            )}
          />
        ) : (
          <EmptyList title={'Belum ada jadwal tersedia'} />
        )}
      </View>
    );
  }

  // Admin render
  const renderAdminContent = () => {
    return (
      <View style={styles.containerTab} showsVerticalScrollIndicator={false}>
        <View style={styles.topContentTab}>
          <Text style={styles.textHi} variant={'bodyMedium'}>
            Halo, {user?.name}
          </Text>
        </View>
        <ModalView
          visible={modalState.visible}
          type={modalState.type}
          message={modalState.message}
          status={modalState?.status}
          onPress={() => hideModal()}
        />
        <Tab.Navigator tabBar={props => <MyTabBar key={props} {...props} />}>
          <Tab.Screen
            name={'BelumTerdaftar'}
            component={RenderAdminOnGoing}
            options={{
              title: 'Belum Dilaksanakan',
            }}
          />
          <Tab.Screen
            name="Terdaftar"
            component={RenderAdminOnFinished}
            options={{
              title: 'Sudah Dilaksanakan',
            }}
          />
        </Tab.Navigator>
      </View>
    );
  };

  // List ok
  function RenderAdminOnFinished() {
    return (
      <View style={styles.listModeContainer}>
        {jadwalDone?.length ? (
          <FlatList
            data={jadwalDone}
            renderItem={({item, index}) => (
              <CustomCard.AdminImunisasiCard
                data={item}
                onPress={() =>
                  navigation.navigate('AdminAntrian', {
                    data: {id: item.id, isHistory: true},
                  })
                }
              />
            )}
          />
        ) : (
          <EmptyList title={'Belum ada jadwal tersedia'} />
        )}
      </View>
    );
  }

  return user.role == 'user' ? renderUserContent() : renderAdminContent();
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_BACKGROUND,
    padding: Size.SIZE_24,
  },

  containerTab: {
    flex: 1,
    backgroundColor: Colors.COLOR_BACKGROUND,
  },

  cardNoJadwal: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.COLOR_WHITE,
    minHeight: Scaler.scaleSize(72),
    marginVertical: Size.SIZE_14,
  },

  topContent: {
    marginBottom: Size.SIZE_20,
  },

  topContentTab: {
    marginBottom: Size.SIZE_20,
    paddingHorizontal: Size.SIZE_24,
    paddingTop: Size.SIZE_24,
  },

  promoContainer: {
    borderRadius: 8,
    marginBottom: Size.SIZE_14,
  },

  promoImg: {
    width: '100%',
    height: Scaler.scaleSize(150),
    borderRadius: 8,
  },

  promoButtonContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 14,
  },

  promoButtonLabel: {
    paddingHorizontal: 12,
    color: Colors.COLOR_BLACK,
  },

  promoButton: {
    backgroundColor: Colors.COLOR_WHITE,
  },

  newsContainer: {
    flex: 1,
    paddingBottom: Size.SIZE_24,
  },

  newsLoading: {flex: 1, justifyContent: 'center'},

  // ADMIN
  listModeContainer: {
    flex: 1,
    padding: Size.SIZE_24,
  },

  // text

  textHi: {
    color: Colors.COLOR_BLACK,
  },

  textTitle: {
    color: Colors.COLOR_BLACK,
    fontWeight: 'bold',
  },

  textCardNoJadwal: {
    color: Colors.COLOR_GREY,
  },
});
