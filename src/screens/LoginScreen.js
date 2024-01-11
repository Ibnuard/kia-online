import {Image, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {Text, TextInput} from 'react-native-paper';
import {ASSETS} from '../utils/assetsLoader';
import {Colors, Scaler, Size} from '../styles';
import {CustomButton, Gap} from '../components';
import {FONT_SIZE_16} from '../styles/typography';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AuthContext, ModalContext, RoleContext} from '../context';
import {getDBdata, isDBPathExist, updateDB} from '../utils/Database';
import ModalView from '../components/modal';
import {retrieveData} from '../utils/store';

const LoginScreen = () => {
  const [phone, setPhone] = React.useState();

  // Nav
  const navigation = useNavigation();
  const route = useRoute();

  // stat
  const {role} = React.useContext(RoleContext);

  console.log('role - > ' + role);

  const {signIn} = React.useContext(AuthContext);
  const {showModal, changeModal, hideModal, modalState} =
    React.useContext(ModalContext);

  const onLogin = async () => {
    showModal({type: 'loading'});

    const ROLE_PATH = role == 'user' ? 'Users' : 'Admins';
    const isUserExist = await isDBPathExist(`${ROLE_PATH}/${phone}`);

    if (isUserExist) {
      const FCM_TOKEN = await retrieveData('FCM', false);

      console.log('FCM -> ' + FCM_TOKEN);

      hideModal();
      try {
        const user = (await getDBdata(`${ROLE_PATH}/${phone}`)).data();
        if (user) {
          await updateDB(`${ROLE_PATH}/${phone}`, {
            fcmToken: FCM_TOKEN,
          });
          signIn({...user, fcmToken: FCM_TOKEN});
        }
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    } else {
      changeModal({
        type: 'popup',
        title: 'Login Gagal',
        message: 'User tidak ditemukan!',
      });
      console.log('Users not found');
    }
  };

  console.log(modalState);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.topContent}>
          <View style={styles.topLogo}>
            <Image
              source={ASSETS.logo}
              style={styles.logo}
              resizeMode={'contain'}
            />
          </View>

          <Text
            variant={'titleSmall'}
            style={styles.textLoginAdmin}
            onPress={() => navigation.navigate('Mode')}>
            {role == 'user' ? 'Masuk sebagai admin' : 'Masuk sebagau pengguna'}
          </Text>
          <Icon name={'arrowright'} size={18} color={Colors.COLOR_PRIMARY} />
        </View>
        <View style={styles.bgContainer}>
          <Image
            source={ASSETS.hero[role][0]}
            style={styles.heroImg}
            resizeMode={'contain'}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text variant={'titleLarge'} style={styles.textTitle}>
          Halo! Selamat datang kembali
        </Text>
        <Text variant={'bodyMedium'} style={styles.textBody}>
          Masukan nomor telepon yang sudah terdaftar untuk masuk ke halaman
          utama
        </Text>
        <Gap height={24} />
        <Text variant={'labelLarge'} style={styles.labelTitle}>
          Nomor Telpon
        </Text>
        <TextInput
          mode={'outlined'}
          placeholder="Masukan nomor telponmu disini..."
          placeholderTextColor={Colors.COLOR_GREY}
          onChangeText={te => setPhone(te)}
          value={phone}
          keyboardType={'phone-pad'}
        />
        <Gap height={20} />
        <CustomButton disabled={!phone} onPress={() => onLogin()}>
          Masuk
        </CustomButton>
        <Gap height={28} />
        <View style={styles.bottomContainer}>
          <Text variant={'bodyMedium'}>Belum pernah mendaftar?</Text>
          <Text
            variant={'bodyMedium'}
            style={styles.textLink}
            onPress={() => navigation.navigate('SignUp')}>
            Daftar
          </Text>
        </View>
      </View>
      <ModalView
        visible={modalState.visible}
        type={modalState.type}
        message={modalState.message}
        onPress={() => hideModal()}
        title={modalState?.title}
        status={modalState.status}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Size.SIZE_24,
  },

  topContainer: {
    flex: 1,
    backgroundColor: Colors.HERO_BG,
  },

  inputContainer: {
    borderTopWidth: 1,
    borderColor: Colors.COLOR_LIGHT_GRAY,
    backgroundColor: Colors.COLOR_WHITE,
    padding: Size.SIZE_24,
  },

  bgContainer: {},

  heroImg: {
    alignSelf: 'center',
    height: '100%',
    width: Scaler.scaleSize(420),
    marginTop: Scaler.scaleSize(8),
  },

  topLogo: {
    flex: 1,
  },

  topContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Size.SIZE_14,
    paddingVertical: Size.SIZE_8,
  },

  logo: {
    height: 40,
    width: 40,
  },

  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  // text

  textTitle: {
    fontSize: Scaler.scaleFont(20),
    fontWeight: 'bold',
    marginBottom: 8,
  },

  textBody: {
    color: Colors.COLOR_GREY,
    lineHeight: 24,
  },

  labelTitle: {
    fontSize: FONT_SIZE_16,
    marginBottom: Scaler.scaleSize(8),
    color: Colors.COLOR_BLACK,
    fontWeight: 'bold',
  },

  textLoginAdmin: {
    color: Colors.COLOR_PRIMARY,
    paddingHorizontal: 8,
  },

  textLink: {
    color: Colors.COLOR_BLACK,
    fontWeight: 'bold',
    marginHorizontal: 4,
    paddingHorizontal: 2,
  },
});
